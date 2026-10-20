import type { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { CheckCircle2, Mail } from "lucide-react"
import { getAllNewsletters } from "@/utils/api/newsletterService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export const NewsletterManagement: FC = () => {
  const {
    data: newsletters = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "newsletters"],
    queryFn: getAllNewsletters,
  })

  const sendEmailToAll = () => {
    if (!newsletters.length) return
    const emails = newsletters.map((n) => n.email).join(",")
    window.location.href = `mailto:${emails}`
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Odběratelé newsletteru</h1>
          <p className="text-sm text-muted-foreground">
            Seznam uživatelů přihlášených k odběru novinek
          </p>
        </div>
        <Button
          onClick={sendEmailToAll}
          disabled={!newsletters.length}
          variant="default"
        >
          <Mail className="size-4" />
          Napsat všem ({newsletters.length})
        </Button>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Odběratele newsletteru se nepodařilo načíst.
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-36">Stav</TableHead>
              <TableHead className="w-48">Vytvořeno</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                </TableRow>
              ))
            ) : newsletters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádní odběratelé newsletteru.
                </TableCell>
              </TableRow>
            ) : (
              newsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="font-mono text-xs">
                    {newsletter.id}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${newsletter.email}`}
                      className="font-medium hover:underline"
                    >
                      {newsletter.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    {newsletter.verified ? (
                      <Badge
                        variant="outline"
                        className="gap-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="size-3" />
                        Ověřeno
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Neověřeno</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {toCzechDateFormat(newsletter.created)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
