import Document from "../../src/domain/Document"

describe("Document", () => {
  test("is valid document", () => {
    const document = new Document("470.649.910-04")
    expect(document.value).toBe("470.649.910-04")
  })
  test("should throw error with document not valid", () => {
    expect(() => new Document("123456789789")).toThrow("Invalid document")
  })
})