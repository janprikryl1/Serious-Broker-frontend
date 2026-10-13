import { webOrigin } from "@/env.ts"

/** Cesta k přihlášení ve projektu `web` (`routes.signIn`). */
const SIGN_IN_PATH = "/sign_in"

/**
 * Odskočí na login veřejného webu a předá mu zpětnou adresu. Admin je
 * samostatný build, takže se tu NEDÁ použít react-router `navigate` — musí to
 * být celá navigace prohlížeče.
 *
 * Po úspěšném loginu web zapíše token do localStorage (stejný origin) a podle
 * `?redirect=` nás vrátí přesně tam, odkud jsme odešli.
 */
export const redirectToSignIn = (reason?: "forbidden") => {
  const target = `${window.location.pathname}${window.location.search}`
  const params = new URLSearchParams({ redirect: target })
  if (reason) {
    params.set("reason", reason)
  }

  window.location.assign(`${webOrigin}${SIGN_IN_PATH}?${params.toString()}`)
}

/** Odhlášení platí pro celou doménu — token je společný. */
export const redirectToHome = () => {
  window.location.assign(`${webOrigin}/`)
}
