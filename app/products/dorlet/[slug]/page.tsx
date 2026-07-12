import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/dorlet/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("dorlet")

export { generateMetadata }
export default Page
