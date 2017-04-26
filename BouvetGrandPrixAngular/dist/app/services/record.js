"use strict";
var Record = (function () {
    function Record(time, name, email, company) {
        this.time = time;
        this.name = name;
        this.email = email;
        this.company = company;
    }
    Record.prototype.toString = function () {
        return "Name: " + this.name + ", email: " + this.email + ", company: " + this.company + ", time: " + this.time;
    };
    return Record;
}());
exports.Record = Record;

//# sourceMappingURL=record.js.map
