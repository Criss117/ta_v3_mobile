import * as _libsql_client from '@libsql/client';
import * as _trpc_server from '@trpc/server';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

declare const appRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
    ctx: undefined;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: true;
}, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
    products: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                search: {
                    limit?: number | undefined;
                    searchQuery?: string | null | undefined;
                };
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: {
                items: {
                    category: {
                        id: number;
                        name: string;
                    } | null;
                    isActive: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    id: number;
                    barcode: string | null;
                    description: string;
                    costPrice: number;
                    salePrice: number;
                    wholesalePrice: number;
                    stock: number;
                    minStock: number;
                    categoryId: number | null;
                }[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                description: string;
                barcode: string;
                costPrice: number;
                salePrice: number;
                wholesalePrice: number;
                stock: number;
                minStock: number;
                categoryId?: number | null | undefined;
            };
            output: void;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                data: {
                    description?: string | undefined;
                    barcode?: string | undefined;
                    costPrice?: number | undefined;
                    salePrice?: number | undefined;
                    wholesalePrice?: number | undefined;
                    stock?: number | undefined;
                    minStock?: number | undefined;
                    categoryId?: number | null | undefined;
                };
                productId: number;
            };
            output: void;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                productId: number;
            };
            output: void;
        }>;
        findOneBy: _trpc_server.TRPCQueryProcedure<{
            input: {
                barcode?: string | null | undefined;
                productId?: number | null | undefined;
            };
            output: {
                category: {
                    id: number;
                    name: string;
                } | null;
                isActive: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                id: number;
                barcode: string | null;
                description: string;
                costPrice: number;
                salePrice: number;
                wholesalePrice: number;
                stock: number;
                minStock: number;
                categoryId: number | null;
            };
        }>;
    }>>;
    categories: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                search: {
                    limit?: number | undefined;
                    searchQuery?: string | null | undefined;
                };
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: {
                items: {
                    id: number;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                }[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description?: string | null | undefined;
            };
            output: void;
        }>;
    }>>;
    clients: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                search: {
                    limit?: number | undefined;
                    searchQuery?: string | null | undefined;
                };
                cursor: {
                    createdAt: Date | null;
                    lastClientCode?: string | null | undefined;
                };
            };
            output: {
                items: {
                    isActive: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    id: string;
                    fullName: string;
                    email: string | null;
                    phone: string | null;
                    address: string | null;
                    creditLimit: number;
                    clientCode: string;
                    globalNumberOfInstallments: number;
                    globalInstallmentModality: "weekly" | "monthly" | "biweekly";
                }[];
                nextCursor: {
                    createdAt: Date | null;
                    lastClientCode?: string | null | undefined;
                };
            };
        }>;
        findOneBy: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId?: string | null | undefined;
                clientCode?: string | null | undefined;
            };
            output: {
                totalDebt: number;
                totalTickets: number;
                totalTicketsUnpaid: number;
                totalTicketsPaid: number;
                totalInstallments: number;
                lastTicketDate: Date | null;
                isActive: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                id: string;
                fullName: string;
                email: string | null;
                phone: string | null;
                address: string | null;
                creditLimit: number;
                clientCode: string;
                globalNumberOfInstallments: number;
                globalInstallmentModality: "weekly" | "monthly" | "biweekly";
            };
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                fullName: string;
                creditLimit: number;
                clientCode: string;
                globalNumberOfInstallments: number;
                globalInstallmentModality: "weekly" | "monthly" | "biweekly";
                email?: string | null | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
            };
            output: {
                id: string;
            };
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                email?: string | null | undefined;
                fullName?: string | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
                creditLimit?: number | undefined;
                clientCode?: string | undefined;
                globalNumberOfInstallments?: number | undefined;
                globalInstallmentModality?: "weekly" | "monthly" | "biweekly" | undefined;
            };
            output: _libsql_client.ResultSet;
        }>;
    }>>;
    tickets: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                payType: "cash" | "credit";
                items: {
                    description: string;
                    productId: number;
                    price: number;
                    quantity: number;
                }[];
                clientId?: string | null | undefined;
            };
            output: number | [number, void];
        }>;
        findManyByClient: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId: string;
            };
            output: {
                items: {
                    id: number;
                    description: string;
                    productId: number;
                    quantity: number;
                    subtotal: number;
                }[];
                isActive: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                id: number;
                clientId: string | null;
                total: number;
                totalPaid: number;
                status: "partial" | "unpaid" | "paid";
                payType: "cash" | "credit" | null;
            }[];
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                ticketId: number;
            };
            output: any;
        }>;
    }>>;
    installments: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        findAllByClient: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId: string;
            };
            output: {
                installments: {
                    id: number;
                    status: "partial" | "unpaid" | "paid";
                    subtotal: number;
                    installmentNumber: number;
                    subtotalPaid: number;
                }[];
                installments_plans: {
                    isActive: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    id: number;
                    clientId: string;
                    numberOfInstallments: number;
                    installmentsPaid: number;
                    modality: "weekly" | "monthly" | "biweekly";
                    totalPaid: number;
                    total: number;
                    status: "partial" | "unpaid" | "paid";
                };
                installmets_payments: {
                    isActive: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    id: number;
                    planId: number;
                    installmentNumber: number;
                    dueDate: Date;
                    paymentDate: Date | null;
                    subtotalPaid: number;
                    subtotal: number;
                    status: "partial" | "unpaid" | "paid";
                };
            }[];
        }>;
    }>>;
    payments: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: undefined;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: true;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        payDebt: _trpc_server.TRPCMutationProcedure<{
            input: {
                type: "pay_debt" | "settle_debt";
                clientId: string;
                amount?: number | null | undefined;
            };
            output: void;
        }>;
        findManyByClient: _trpc_server.TRPCQueryProcedure<{
            input: {
                search: {
                    limit: number;
                    clientId: string;
                };
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            output: {
                items: {
                    id: number;
                    clientId: string;
                    amount: number;
                    createdAt: Date;
                }[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
        }>;
        deletePayments: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                ids: number[];
            };
            output: any;
        }>;
    }>>;
    greets: _trpc_server.TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
}>>;
type AppRouter = typeof appRouter;

export type { AppRouter };
