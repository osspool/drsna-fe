"use client";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export const TestimonialsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = [
    { id: "g5jV7m6O8Ok", title: "Patient Testimonial 1" },
    { id: "4E4heDTY2Uk", title: "Patient Testimonial 2" },
    { id: "wx8OaHQnejs", title: "Patient Testimonial 3" },
    { id: "1evUXYKrunc", title: "Patient Testimonial 4" },
    { id: "SBm8u1SgvdI", title: "Patient Testimonial 5" },
    { id: "yVhRWnPBK0Q", title: "Patient Testimonial 6" },
  ];

  return (
    <section className="section-accent relative py-20 overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-up space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gold">Hear From Our</span>{" "}
            <span className="text-foreground">Patients</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real patients who have experienced transformative results at Dr SNA Clinic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-2xl overflow-hidden border-2 border-gold/20 hover:border-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Video thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent opacity-60 group-hover:opacity-75 transition-opacity"></div>
              
              <button
                onClick={() => setSelectedVideo(video.id)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>

              <div className="absolute top-4 left-4 glass-effect px-3 py-1.5 rounded-full border border-primary/30">
                <span className="text-primary text-sm font-medium">#Testimonial</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-up">
          <p className="text-muted-foreground text-sm">
            [trustindex no-registration=google]
          </p>
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-card border-border overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full glass-effect p-2 border border-border hover:bg-primary hover:border-primary transition-all duration-300 group">
            <X className="h-5 w-5 text-foreground group-hover:text-primary-foreground" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedVideo && (
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Patient Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

