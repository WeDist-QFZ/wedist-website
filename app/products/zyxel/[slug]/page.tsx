import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/zyxel/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("zyxel")

export { generateMetadata }
export default Page
