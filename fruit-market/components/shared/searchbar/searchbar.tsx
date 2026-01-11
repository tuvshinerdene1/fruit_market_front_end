import { Input } from "@/components/ui/input";
import {Search} from "lucide-react"

export function SearchBar(){
    return(
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></Search>
            <Input type="search"
                    placeholder="Search fresh fruits..."
                    className="pl-8 rounded-full bg-secondary"></Input>
        </div>
    )
}