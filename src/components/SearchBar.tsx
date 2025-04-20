
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

export const SearchBar = ({ value, onChange, onSearch, isSearching = false }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mb-8">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-white/30 backdrop-blur-lg border-none"
        disabled={isSearching}
      />
      <Button type="submit" className="bg-primary hover:bg-primary/80" disabled={isSearching}>
        {isSearching ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};
