"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
exports.sumArray = sumArray;
exports.createUser = createUser;
exports.getOrderStatus = getOrderStatus;
console.log('#19. TypeScript homework example file');
/*
 * #1
 */
function sumArray(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce(function (sum, num) { return sum + num; }, 0);
}
function createUser(name, age, isActive) {
    if (isActive === void 0) { isActive = true; }
    return {
        name: name,
        age: age,
        isActive: isActive
    };
}

/*
 * #3
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
function getOrderStatus(status) {
    switch (status) {
        case OrderStatus.Pending:
            return 'Замовлення очікує на обробку';
        case OrderStatus.Shipped:
            return 'Замовлення було відправлено';
        case OrderStatus.Delivered:
            return 'Замовлення доставлено';
        case OrderStatus.Cancelled:
            return 'Замовлення скасовано';
        default:
            throw new Error('Невідомий статус замовлення');
    }
}
