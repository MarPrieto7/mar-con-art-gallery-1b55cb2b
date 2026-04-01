import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="py-10 px-4 bg-card border-t border-border">
    <div className="container mx-auto text-center">
      <p className="font-display text-lg text-foreground mb-3">Mar con Art</p>
      <div className="flex items-center justify-center gap-5 mb-4">
        <a href="https://instagram.com/mar_con_art" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram size={18} />
        </a>
      </div>
      <p className="text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Mar con Art. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
