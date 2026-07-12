import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/motorola-solutions/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("motorola-solutions")

export { generateMetadata }
export default Page
