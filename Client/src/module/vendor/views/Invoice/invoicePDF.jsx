import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  section: {
    marginBottom: 20
  },
  SaperateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageContainer: {
    width: '10%'
  },
  invoiceText: {
    width: '20%'
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCell: {
    padding: 5,
    border: '1px solid black',
    width: '25%'
  },
  headerCell: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 10
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const MyDocument = ({
  companyDetails = { companyName: 'N/A', companyAddress: 'N/A', companyPhoneNumber: 'N/A', companyEmail: 'N/A' },
  customerDetails = { customerName: 'N/A', customerAddress: 'N/A', customerPhoneNumber: 'N/A', customerEmail: 'N/A' },
  invoiceInformation = {
    invoiceNumber: 'N/A',
    invoiceDate: 'N/A',
    dueDate: 'N/A',
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentMethod: 'N/A',
    paymentInstructions: 'N/A'
  },
  customerProducts = []
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo Section */}
      <View style={[styles.SaperateSection, styles.section]}>
        <View style={styles.imageContainer}>
          <Image
            src="https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-jpeg-file-document-icon-png-image_898031.jpg"
            style={{ width: '100%', height: 50 }}
          />
        </View>
        <View style={styles.invoiceText}>
          <Text>INVOICE</Text>
        </View>
      </View>

      <View style={styles.SaperateSection}>
        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.headerText}>Customer Details:</Text>
          <Text style={styles.text}>Customer Name: {customerDetails.customerName}</Text>
          <Text style={styles.text}>Customer Address: {customerDetails.customerAddress}</Text>
          <Text style={styles.text}>Customer Phone Number: {customerDetails.customerPhoneNumber}</Text>
          <Text style={styles.text}>Customer Email: {customerDetails.customerEmail}</Text>
        </View>
        {/* Company Details */}
        <View style={styles.section}>
          <Text style={styles.headerText}>Company Details:</Text>
          <Text style={styles.text}>Company Name: {companyDetails.companyName}</Text>
          <Text style={styles.text}>Company Address: {companyDetails.companyAddress}</Text>
          <Text style={styles.text}>Company Phone Number: {companyDetails.companyPhoneNumber}</Text>
          <Text style={styles.text}>Company Email: {companyDetails.companyEmail}</Text>
          <Text style={styles.text}>Invoice Number: {invoiceInformation.invoiceNumber}</Text>
          <Text style={styles.text}>Invoice Date: {invoiceInformation.invoiceDate}</Text>
          <Text style={styles.text}>Due Date: {invoiceInformation.dueDate}</Text>
        </View>
      </View>

      {/* Products Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell]}>Product Name</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Unit Price</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Total</Text>
        </View>
        {customerProducts.map((product, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{product.productName}</Text>
            <Text style={styles.tableCell}>{product.quantity}</Text>
            <Text style={styles.tableCell}>{product.unitPrice}</Text>
            <Text style={styles.tableCell}>{product.total}</Text>
          </View>
        ))}
      </View>

      <View style={styles.SaperateSection}>
        <View sty style={styles.text} le={styles.section}>
          <Text style={styles.text}>Payment Terms:</Text>
          <Text style={styles.text}>Payment Method: {invoiceInformation.paymentMethod}</Text>
          <Text style={styles.text}>Payment Instructions: {invoiceInformation.paymentInstructions}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Subtotal: {invoiceInformation.subtotal}</Text>
          <Text style={styles.text}>Tax: {invoiceInformation.tax}</Text>
          <Text style={styles.text}>Total: {invoiceInformation.total}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
