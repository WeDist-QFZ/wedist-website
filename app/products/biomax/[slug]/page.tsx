import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/biomax/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("biomax")

export { generateMetadata }
export default Page
