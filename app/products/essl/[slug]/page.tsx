import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/essl/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("essl")

export { generateMetadata }
export default Page
