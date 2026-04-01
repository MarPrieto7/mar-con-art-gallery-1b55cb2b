import { useState, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    // mailto fallback
    const mailtoLink = `mailto:mar_con_art@gmail.com?subject=${encodeURIComponent(
      form.subject || "Consulta desde Mar con Art"
    )}&body=${encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.open(mailtoLink, "_blank");
    toast.success("¡Se ha abierto tu cliente de correo! Envía el email para completar tu consulta.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-background">
      <div ref={ref} className={`container mx-auto max-w-2xl scroll-fade-in ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">Contacto</h2>
        <p className="text-center text-muted-foreground font-body mb-10">
          ¿Te interesa alguna obra o quieres más información? Escríbeme
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Tu nombre *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <input
              type="email"
              placeholder="Tu email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <input
            type="text"
            placeholder="Asunto"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <textarea
            placeholder="Tu mensaje *"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:bg-primary/90 transition-colors"
          >
            Enviar mensaje
          </button>
        </form>

        <div className="flex items-center justify-center mt-10 text-muted-foreground font-body text-sm">
          <a
            href="https://instagram.com/mar_con_art"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Instagram size={16} /> @mar_con_art
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
