/**
 * Ověří, že `?redirect=` míří na vlastní doménu.
 *
 * Parametr plní samostatné buildy (`/admin`, `/editor`), když pošlou
 * nepřihlášeného uživatele na login. Bez validace by šlo podstrčit
 * `?redirect=https://zlo.example` a udělat z loginu open redirect, který se
 * dá zneužít k phishingu — uživatel vidí v odkazu naši doménu, ale skončí
 * jinde, už po přihlášení.
 *
 * Povolené je jen to, co začíná jedním lomítkem. `//cizi.host` je
 * protocol-relative URL (prohlížeč ji bere jako absolutní), proto se zakazuje
 * taky — stejně jako `/\cizi.host`, kterou část prohlížečů normalizuje na
 * `//`.
 */
export const getSafeRedirect = (
    redirect: string | null,
    fallback: string
): string => {
    if (!redirect) return fallback;
    if (!redirect.startsWith("/")) return fallback;
    if (redirect.startsWith("//") || redirect.startsWith("/\\")) return fallback;

    return redirect;
};
