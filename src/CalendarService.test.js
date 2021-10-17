const CalendarService = require("./CalendarService")
// @ponicode
describe("init", () => {
    let inst

    beforeEach(() => {
        inst = new CalendarService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.init()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("saveToAgenda", () => {
    let inst

    beforeEach(() => {
        inst = new CalendarService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.saveToAgenda("International Intranet Coordinator", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", [true, true, true], 20, -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.saveToAgenda("Dynamic Quality Specialist", "https://croplands.org/app/a/reset?token=", [false, true, true], 6, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.saveToAgenda("International Intranet Coordinator", "http://base.com", [false, true, false], 6, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.saveToAgenda("Dynamic Quality Specialist", "https://twitter.com/path?abc", [true, false, false], 2, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.saveToAgenda("Direct Functionality Orchestrator", "http://www.croplands.org/account/confirm?t=", [false, false, true], 5, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.saveToAgenda("", "", undefined, Infinity, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("listAllEvents", () => {
    let inst

    beforeEach(() => {
        inst = new CalendarService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.listAllEvents(() => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.listAllEvents(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
