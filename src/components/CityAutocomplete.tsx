import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

type Commune = {
  nom: string;
  code: string;
  codesPostaux: string[];
  population: number;
  departement: { code: string; nom: string };
};

interface CityAutocompleteProps {
  value: string;
  onChange: (city: string, codePostal?: string, codeInsee?: string) => void;
  placeholder?: string;
  className?: string;
}

export const CityAutocomplete = ({
  value,
  onChange,
  placeholder = "Rechercher une ville…",
  className,
}: CityAutocompleteProps) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Commune[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,code,codesPostaux,population,departement&boost=population&limit=7`,
          { signal: controller.signal },
        );
        const data: Commune[] = await res.json();
        setResults(data);
        setIsOpen(data.length > 0);
      } catch {
        // aborted or error
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) onChange("", undefined);
          }}
          placeholder={placeholder}
          className={`pl-9 ${className || ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 top-full mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((c) => (
            <button
              key={c.code}
              type="button"
              className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent/20 transition-colors flex items-center gap-2"
              onClick={() => {
                const label = `${c.nom} (${c.codesPostaux[0] || c.departement.code})`;
                setQuery(label);
                onChange(c.nom, c.codesPostaux[0], c.code);
                setIsOpen(false);
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground font-medium">{c.nom}</span>
              <span className="text-muted-foreground text-xs ml-auto">{c.codesPostaux[0] || c.departement.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
