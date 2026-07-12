import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/antaira/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("antaira")

export { generateMetadata }
export default Page
