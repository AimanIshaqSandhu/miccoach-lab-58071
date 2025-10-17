import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, LogOut, X, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(2000),
  category: z.string().trim().min(1, "Category is required").max(100),
  location: z.string().trim().max(200).optional(),
  year_completed: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
});

const serviceSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z.string().trim().min(1, "Slug is required").max(200),
  short_description: z.string().trim().max(500).optional(),
  description: z.string().trim().min(1, "Description is required"),
  icon: z.string().trim().max(100).optional(),
});

const gallerySchema = z.object({
  title: z.string().trim().max(200).optional(),
  description: z.string().trim().max(500).optional(),
  category: z.string().trim().min(1, "Category is required").max(100),
});

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  year_completed: number | null;
};

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  icon: string | null;
  is_active: boolean;
};

type GalleryItem = {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  category: string;
  is_active: boolean;
  display_order: number;
};

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [yearCompleted, setYearCompleted] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [serviceShortDesc, setServiceShortDesc] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceIcon, setServiceIcon] = useState("");
  const [serviceImages, setServiceImages] = useState<File[]>([]);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [serviceSubmitting, setServiceSubmitting] = useState(false);
  
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("team");
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryVideo, setGalleryVideo] = useState<File | null>(null);
  const [galleryVideoUrl, setGalleryVideoUrl] = useState("");
  const [galleryMediaType, setGalleryMediaType] = useState<"image" | "video">("image");
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  
  const [projectVideos, setProjectVideos] = useState<File[]>([]);
  const [serviceVideos, setServiceVideos] = useState<File[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await Promise.all([fetchProjects(), fetchServices(), fetchGalleryItems()]);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
  };

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch gallery items",
        variant: "destructive",
      });
    } else {
      setGalleryItems(data || []);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (galleryMediaType === "image" && galleryImages.length === 0) {
      toast({ title: "Error", description: "Please select at least one image", variant: "destructive" });
      return;
    }

    if (galleryMediaType === "video" && !galleryVideoUrl.trim()) {
      toast({ title: "Error", description: "Please enter a video URL", variant: "destructive" });
      return;
    }

    try {
      const validated = gallerySchema.parse({
        title: galleryTitle.trim() || undefined,
        description: galleryDescription.trim() || undefined,
        category: galleryCategory,
      });

      setGallerySubmitting(true);

      if (galleryMediaType === "image") {
        // Upload all images
        for (const image of galleryImages) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('gallery-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('gallery-images')
            .getPublicUrl(filePath);

          const { error: insertError } = await supabase
            .from('gallery')
            .insert([{
              image_url: publicUrl,
              title: validated.title || null,
              description: validated.description || null,
              category: validated.category,
              media_type: 'image',
            }]);

          if (insertError) throw insertError;
        }

        toast({ 
          title: "Success", 
          description: `${galleryImages.length} image${galleryImages.length > 1 ? 's' : ''} uploaded successfully` 
        });
      } else {
        // Insert video URL
        const { error: insertError } = await supabase
          .from('gallery')
          .insert([{
            image_url: null,
            video_url: galleryVideoUrl.trim(),
            title: validated.title || null,
            description: validated.description || null,
            category: validated.category,
            media_type: 'video',
          }]);

        if (insertError) throw insertError;

        toast({ 
          title: "Success", 
          description: "Video added successfully" 
        });
      }

      setGalleryTitle("");
      setGalleryDescription("");
      setGalleryCategory("team");
      setGalleryImages([]);
      setGalleryVideoUrl("");
      setGalleryMediaType("image");
      fetchGalleryItems();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setGallerySubmitting(false);
    }
  };

  const deleteGalleryItem = async (id: string, imageUrl: string | null) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      if (imageUrl) {
        const filePath = imageUrl.split('/').pop();
        if (filePath) {
          await supabase.storage.from('gallery-images').remove([filePath]);
        }
      }

      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;

      toast({ title: "Success", description: "Gallery item deleted" });
      fetchGalleryItems();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = projectSchema.parse({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        location: location.trim() || undefined,
        year_completed: yearCompleted ? parseInt(yearCompleted) : undefined,
      });

      setSubmitting(true);

      const projectData: any = {
        title: validated.title,
        description: validated.description,
        category: validated.category,
      };

      if (validated.location) projectData.location = validated.location;
      if (validated.year_completed) projectData.year_completed = validated.year_completed;

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();

      if (projectError) throw projectError;

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${project.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          const { error: imageError } = await supabase
            .from('project_images')
            .insert([{
              project_id: project.id,
              image_url: publicUrl,
              is_primary: i === 0,
              display_order: i,
            }]);

          if (imageError) throw imageError;
        }
      }

      // Upload project videos
      if (projectVideos.length > 0) {
        for (let i = 0; i < projectVideos.length; i++) {
          const file = projectVideos[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${project.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          const { error: videoError } = await supabase
            .from('project_videos')
            .insert([{
              project_id: project.id,
              video_url: publicUrl,
              display_order: i,
            }]);

          if (videoError) throw videoError;
        }
      }

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setYearCompleted("");
      setImages([]);
      setProjectVideos([]);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    }
  };

  const handleServiceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setServiceImages(Array.from(e.target.files));
    }
  };

  const removeServiceImage = (index: number) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const editService = (service: Service) => {
    setEditingService(service.id);
    setServiceTitle(service.title);
    setServiceSlug(service.slug);
    setServiceShortDesc(service.short_description || "");
    setServiceDescription(service.description);
    setServiceIcon(service.icon || "");
  };

  const cancelEditService = () => {
    setEditingService(null);
    setServiceTitle("");
    setServiceSlug("");
    setServiceShortDesc("");
    setServiceDescription("");
    setServiceIcon("");
    setServiceImages([]);
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = serviceSchema.parse({
        title: serviceTitle.trim(),
        slug: serviceSlug.trim(),
        short_description: serviceShortDesc.trim() || undefined,
        description: serviceDescription.trim(),
        icon: serviceIcon.trim() || undefined,
      });

      setServiceSubmitting(true);

      const serviceData: any = {
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
      };

      if (validated.short_description) serviceData.short_description = validated.short_description;
      if (validated.icon) serviceData.icon = validated.icon;

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingService);

        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully" });
      } else {
        const { data: service, error: serviceError } = await supabase
          .from("services")
          .insert([serviceData])
          .select()
          .single();

        if (serviceError) throw serviceError;

        if (serviceImages.length > 0) {
          for (let i = 0; i < serviceImages.length; i++) {
            const file = serviceImages[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${service.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('service-images')
              .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('service-images')
              .getPublicUrl(filePath);

            const { error: imageError } = await supabase
              .from('service_images')
              .insert([{
                service_id: service.id,
                image_url: publicUrl,
                is_primary: i === 0,
                display_order: i,
              }]);

            if (imageError) throw imageError;
          }
        }

        // Upload service videos
        if (serviceVideos.length > 0) {
          for (let i = 0; i < serviceVideos.length; i++) {
            const file = serviceVideos[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${service.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('service-images')
              .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('service-images')
              .getPublicUrl(filePath);

            const { error: videoError } = await supabase
              .from('service_videos')
              .insert([{
                service_id: service.id,
                video_url: publicUrl,
                display_order: i,
              }]);

            if (videoError) throw videoError;
          }
        }

        toast({ title: "Success", description: "Service created successfully" });
      }

      cancelEditService();
      fetchServices();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setServiceSubmitting(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Service deleted successfully" });
      fetchServices();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        maxLength={2000}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year Completed</Label>
                      <Input
                        id="year"
                        type="number"
                        value={yearCompleted}
                        onChange={(e) => setYearCompleted(e.target.value)}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="images">Project Images</Label>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                      {images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {images.map((img, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(img)}
                                alt={`Preview ${index + 1}`}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectVideos">Project Videos</Label>
                      <Input
                        id="projectVideos"
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => setProjectVideos(e.target.files ? Array.from(e.target.files) : [])}
                      />
                      {projectVideos.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {projectVideos.map((vid, index) => (
                            <div key={index} className="relative bg-muted p-2 rounded">
                              <p className="text-xs">{vid.name}</p>
                              <button
                                type="button"
                                onClick={() => setProjectVideos(projectVideos.filter((_, i) => i !== index))}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Creating..." : "Create Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Existing Projects ({projects.length})</h2>
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.category}
                          </p>
                          {project.location && (
                            <p className="text-sm text-muted-foreground">
                              {project.location}
                            </p>
                          )}
                          {project.year_completed && (
                            <p className="text-sm text-muted-foreground">
                              {project.year_completed}
                            </p>
                          )}
                          <p className="text-sm mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingService ? "Edit Service" : "Add New Service"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceTitle">Service Title *</Label>
                      <Input
                        id="serviceTitle"
                        value={serviceTitle}
                        onChange={(e) => setServiceTitle(e.target.value)}
                        required
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceSlug">Slug * (URL-friendly)</Label>
                      <Input
                        id="serviceSlug"
                        value={serviceSlug}
                        onChange={(e) => setServiceSlug(e.target.value)}
                        placeholder="e.g., living-room"
                        required
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceShortDesc">Short Description</Label>
                      <Input
                        id="serviceShortDesc"
                        value={serviceShortDesc}
                        onChange={(e) => setServiceShortDesc(e.target.value)}
                        maxLength={500}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceDescription">Full Description *</Label>
                      <Textarea
                        id="serviceDescription"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        required
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceIcon">Icon Name (Lucide)</Label>
                      <Input
                        id="serviceIcon"
                        value={serviceIcon}
                        onChange={(e) => setServiceIcon(e.target.value)}
                        placeholder="e.g., Home"
                        maxLength={100}
                      />
                    </div>

                    {!editingService && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="serviceImages">Service Images</Label>
                          <Input
                            id="serviceImages"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleServiceImageChange}
                          />
                          {serviceImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {serviceImages.map((img, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={URL.createObjectURL(img)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeServiceImage(index)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="serviceVideos">Service Videos</Label>
                          <Input
                            id="serviceVideos"
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={(e) => setServiceVideos(e.target.files ? Array.from(e.target.files) : [])}
                          />
                          {serviceVideos.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {serviceVideos.map((vid, index) => (
                                <div key={index} className="relative bg-muted p-2 rounded">
                                  <p className="text-xs">{vid.name}</p>
                                  <button
                                    type="button"
                                    onClick={() => setServiceVideos(serviceVideos.filter((_, i) => i !== index))}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1" disabled={serviceSubmitting}>
                        {serviceSubmitting ? "Saving..." : editingService ? "Update Service" : "Add Service"}
                      </Button>
                      {editingService && (
                        <Button type="button" variant="outline" onClick={cancelEditService}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Existing Services ({services.length})</h2>
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            /{service.slug}
                          </p>
                          {service.short_description && (
                            <p className="text-sm mt-2 line-clamp-2">
                              {service.short_description}
                            </p>
                          )}
                          <p className={`text-xs mt-2 ${service.is_active ? 'text-green-500' : 'text-red-500'}`}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => editService(service)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Add Gallery Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGallerySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Media Type *</Label>
                      <Select value={galleryMediaType} onValueChange={(v: "image" | "video") => setGalleryMediaType(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Images</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {galleryMediaType === "image" ? (
                      <div className="space-y-2">
                        <Label htmlFor="galleryImages">Images * (Multiple selection allowed)</Label>
                        <Input
                          id="galleryImages"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => setGalleryImages(e.target.files ? Array.from(e.target.files) : [])}
                        />
                        {galleryImages.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {galleryImages.map((img, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt={`Preview ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== index))}
                                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="galleryVideoUrl">Video URL * (YouTube, Vimeo, or direct link)</Label>
                        <Input
                          id="galleryVideoUrl"
                          type="url"
                          value={galleryVideoUrl}
                          onChange={(e) => setGalleryVideoUrl(e.target.value)}
                          placeholder="https://www.youtube.com/embed/..."
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="galleryCategory">Category *</Label>
                      <Select value={galleryCategory} onValueChange={setGalleryCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="projects">Projects</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="galleryTitle">Title (Optional)</Label>
                      <Input
                        id="galleryTitle"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        maxLength={200}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="galleryDescription">Description (Optional)</Label>
                      <Textarea
                        id="galleryDescription"
                        value={galleryDescription}
                        onChange={(e) => setGalleryDescription(e.target.value)}
                        maxLength={500}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={gallerySubmitting}>
                      {gallerySubmitting ? "Uploading..." : galleryMediaType === "image" ? `Upload ${galleryImages.length > 0 ? galleryImages.length : ''} Image${galleryImages.length !== 1 ? 's' : ''}` : "Add Video"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Gallery Images ({galleryItems.length})</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id} className="relative">
                      <img
                        src={item.image_url}
                        alt={item.title || "Gallery image"}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                        {item.title && <p className="font-semibold text-sm">{item.title}</p>}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => deleteGalleryItem(item.id, item.image_url)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
