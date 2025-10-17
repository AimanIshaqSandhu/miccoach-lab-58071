import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Homeowner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    content: "Premium Ceilings transformed our living room completely. The attention to detail and professionalism is outstanding. Highly recommend their services!",
    rating: 5
  },
  {
    name: "Sarah Ali",
    role: "Interior Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "I've worked with many ceiling contractors, but Premium Ceilings stands out. Their quality and timely delivery make them my go-to choice for all projects.",
    rating: 5
  },
  {
    name: "Hassan Malik",
    role: "Restaurant Owner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan",
    content: "They did an amazing job on our restaurant ceiling. The design perfectly complements our ambiance, and the installation was seamless. Worth every penny!",
    rating: 4
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border bg-dark-card hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
