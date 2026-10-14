import { useEffect, useState, type FC } from "react"
import { useParams, Link } from "react-router"
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Mail,
  Plus,
  Share2,
  Loader2,
  Globe,
} from "lucide-react"
import { toast } from "sonner"
import { getArticlePosts } from "@/utils/api/articlePostService.ts"
import { getNewslettersEmailsService } from "@/utils/api/newslettersEmailsService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { domain } from "@/utils/constants/media.ts"
import type { ArticlePostListResponseResponse } from "@/utils/types/article.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"

export const ArticleShare: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [articleName, setArticleName] = useState("")
  const [posts, setPosts] = useState<ArticlePostListResponseResponse[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // Email state
  const [emails, setEmails] = useState<string[]>([])
  const [emailText, setEmailText] = useState("")

  useEffect(() => {
    if (!id) return
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await getArticlePosts(id)
        if (res?.data) {
          setArticleName(res.data.article_name || "")
          setPosts(res.data.data || [])
          const langs = res.data.languages || []
          setLanguages(langs)
          if (langs.length > 0) {
            setSelectedLanguage(langs[0])
          }
        }
      } catch (err) {
        console.error("Failed to load article posts", err)
        toast.error("Nepodařilo se načíst příspěvky ke článku")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [id])

  // Load emails
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await getNewslettersEmailsService()
        if (res?.data) {
          setEmails(res.data)
        }
      } catch (err) {
        console.error("Failed to load emails", err)
      }
    }
    fetchEmails()
  }, [])

  const currentUrl = selectedLanguage
    ? `${domain}/article/${id}/${selectedLanguage}`
    : `${domain}/article/${id}`

  useEffect(() => {
    setEmailText(
      `Dobrý den,\n\nS radostí oznamujeme, že vyšel nový článek „${articleName || ""}". Naleznete ho zde: ${currentUrl}\n\nPřejeme pěkný den,\nTým Serious Broker`
    )
  }, [currentUrl, articleName])

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success("Odkaz byl zkopírován do schránky")
  }

  const handleSendEmails = () => {
    const emailAddresses = emails.join(",")
    const encodedSubject = encodeURIComponent(`Nový článek: ${articleName}`)
    const encodedBody = encodeURIComponent(emailText).replace(/%0A/g, "%0D%0A")
    window.location.href = `mailto:${emailAddresses}?subject=${encodedSubject}&body=${encodedBody}`
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link to={`/articles/edit/${id}`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Sdílení článku: {articleName || `#${id}`}
          </h1>
          <p className="text-muted-foreground text-sm">
            Generujte odkazy, newslettery a příspěvky na sociální sítě.
          </p>
        </div>
      </div>

      {/* Share Link Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5" />
            Přímý odkaz na článek
          </CardTitle>
          <CardDescription>
            Zvolte jazykovou mutaci a zkopírujte odkaz na web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {languages.length > 0 && (
              <div className="w-full sm:w-48">
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Jazyk" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="relative flex-1">
              <Input value={currentUrl} readOnly className="pr-20" />
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={copyLink}
                  title="Zkopírovat odkaz"
                >
                  <Copy className="size-3.5" />
                </Button>
                <Button asChild size="icon-xs" variant="ghost" title="Otevřít na webu">
                  <a href={currentUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Newsletter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Odeslat e-mailem odběratelům
          </CardTitle>
          <CardDescription>
            {emails.length > 0
              ? `Připraveno pro ${emails.length} registrovaných e-mailů newsletteru`
              : "Zatím žádné e-maily odběratelů"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-body">Text e-mailu</Label>
            <Textarea
              id="email-body"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              rows={5}
            />
          </div>

          <Button onClick={handleSendEmails} disabled={emails.length === 0}>
            <Mail className="size-4" />
            Otevřít v e-mailovém klientovi ({emails.length} adresátů)
          </Button>
        </CardContent>
      </Card>

      {/* Social Media Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="size-5" />
              Příspěvky pro sociální sítě
            </CardTitle>
            <CardDescription>
              Připravené posty pro Facebook, X, LinkedIn a další platformy
            </CardDescription>
          </div>
          <Button asChild size="sm">
            <Link to={`/article/post/edit/${id}`}>
              <Plus className="size-4" />
              Nový příspěvek
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              Zatím nebyly vytvořeny žádné příspěvky pro sociální sítě.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/article/post/edit/${post.article_id}/${post.id}`}
                  className="group block"
                >
                  <Card className="p-4 transition-colors group-hover:border-primary/50">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="font-semibold">
                        {post.type}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {toCzechDateFormat(post.created)}
                      </span>
                    </div>
                    <h4 className="group-hover:text-primary mt-2 text-sm font-semibold transition-colors">
                      {post.title || "Bez nadpisu"}
                    </h4>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
