import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/promise/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("promise")

export { generateMetadata }
export default Page
