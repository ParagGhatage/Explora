import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CountryNames } from "@/components/APIs/AllCountries/CountryNames"

export function ComboboxDemo({ onSelectCountry }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [names, setNames] = React.useState([])

  React.useEffect(() => {
    const fetchNames = async () => {
      try {
        const CountriesAll = await CountryNames()
        const arr = CountriesAll.map(country => country.name.common)
        setNames(arr)
      } catch (error) {
        console.error("Error fetching Country details:", error)
      }
    }
    fetchNames()
  }, [onSelectCountry])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-10 text-xl"
        >
          {value || "Select Country..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 text-xl">
        <Command>
          <CommandInput placeholder="Search Country..." className="h-9" />
          <CommandList>
            <CommandEmpty>Country Not found.</CommandEmpty>
            <CommandGroup>
              {names.map((name) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onSelectCountry(name) // Call the callback function
                  }}
                >
                  {name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
