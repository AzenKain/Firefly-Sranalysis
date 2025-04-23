import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig( async () => {
    const locale = (await cookies()).get("MYNEXTAPP_LOCALE")?.value || "en";

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    }
})