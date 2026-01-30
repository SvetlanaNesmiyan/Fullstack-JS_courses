console.log('#19. TypeScript homework example file')

/*
 * #1
 */

function sumArray(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0
  }
  return numbers.reduce((sum, num) => sum + num, 0)
}

/*
 * #2
 */

type User = {
  name: string
  age: number
  isActive: boolean
}

function createUser(name: string, age: number, isActive: boolean = true): User {
  return {
    name,
    age,
    isActive
  }
}

/*
 * #3
 */

enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

function getOrderStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return 'Замовлення очікує на обробку'
    case OrderStatus.Shipped:
      return 'Замовлення було відправлено'
    case OrderStatus.Delivered:
      return 'Замовлення доставлено'
    case OrderStatus.Cancelled:
      return 'Замовлення скасовано'
    default:
      throw new Error('Невідомий статус замовлення')
  }
}

export { sumArray, createUser, OrderStatus, getOrderStatus }
