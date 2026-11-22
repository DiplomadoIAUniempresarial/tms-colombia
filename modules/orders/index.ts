/**
 * Módulo 02 · Órdenes de transporte — superficie pública del módulo.
 * Otros módulos consumen SOLO lo exportado aquí y los tipos de core/types.
 */
export { createOrderSchema, type CreateOrderInput } from "./schemas/order.schema";
export {
  ORDER_TRANSITIONS,
  canTransition,
  assertTransition,
  isEditable,
  nextOrderNumber,
} from "./services/order.rules";
export { listOrders, createOrder, transitionOrderStatus } from "./services/order.service";
export { OrderTable, type OrderTableProps } from "./components/OrderTable";
export { OrderForm, type OrderFormProps } from "./components/OrderForm";
