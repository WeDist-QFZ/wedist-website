import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/western-digital/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("western-digital")

export { generateMetadata }
export default Page
