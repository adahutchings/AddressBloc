const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index.js").sequelize;

describe("ContactController", ()=> {
    
    beforeEach((done) => {
        this.book = new ContactController();

    //#1
        sequelize.sync({force: true}).then((res) => {
            done();
        })
        .catch((err)=> {
            done();
        });
    });


    describe('#addContact()', () => {
        it("should add a single contact into the book", (done) => {
            this.book.addContact("Alice", "001-101-1010", "alice@alice.com")
            .then((contact)=> {
                expect(contact.name).toBe("Alice");
                expect(contact.phone).toBe("001-101-1010");
                expect(contact.email).toBe("alice@alice.com");
                done();
            })
            .catch((err) => {
                done();
            });
        });
    });

    describe('#getContacts()', () => {
        it("should return an empty array when no contacts are available",(done) => {
            this.book.getContacts()
            .then((contacts)=> {
                expect(contacts.length).toBe(0);
                done()
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should return an array of contacts when contacts are available", (done) => {
            this.book.addContact("Alice", "001-101-1010", "alice@alice.com")
            .then(() => {
                this.book.getContacts()
                .then((contacts) => {
                    expect(contacts.length).toBe(1);
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
})