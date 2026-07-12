import { createDatasheetRedirect } from "@/lib/datasheet-redirect"

// Handles /products/qsan/<product-id> -> redirects to that product's datasheet.
const { generateMetadata, Page } = createDatasheetRedirect("qsan")

export { generateMetadata }
export default Page
