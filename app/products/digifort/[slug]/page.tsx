import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/digifort/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("digifort")

export { generateMetadata }
export default Page
