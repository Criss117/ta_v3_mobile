import { z } from 'zod';
import * as _libsql_client from '@libsql/client';
import * as drizzle_orm_sqlite_core from 'drizzle-orm/sqlite-core';
import * as _trpc_server from '@trpc/server';

interface PaymentSummary {
    id: number;
    clientId: string;
    amount: number;
    createdAt: Date;
}

declare const ticketStatus: readonly ["unpaid", "partial", "paid"];
declare const installmentModality: readonly ["weekly", "monthly", "biweekly"];
type InstallmentModality = (typeof installmentModality)[number];
type TicketStaus = (typeof ticketStatus)[number];

declare const products: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "products";
    schema: undefined;
    columns: {
        isActive: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_active";
            tableName: "products";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "products";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        barcode: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "barcode";
            tableName: "products";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "products";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        costPrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cost_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        salePrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sale_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        wholesalePrice: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "wholesale_price";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        stock: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "stock";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        minStock: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "min_stock";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        categoryId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "category_id";
            tableName: "products";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;

declare const installmentPaymentSummaryDto: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodEnum<{
        unpaid: "unpaid";
        partial: "partial";
        paid: "paid";
    }>;
    subtotalPaid: z.ZodNumber;
    subtotal: z.ZodNumber;
    installmentNumber: z.ZodNumber;
    dueDate: z.ZodPipe<z.ZodNumber, z.ZodTransform<Date, number>>;
    createdAt: z.ZodPipe<z.ZodNumber, z.ZodTransform<Date, number>>;
}, z.core.$strip>;
type InstallmentsPaymentSchema = z.infer<typeof installmentPaymentSummaryDto>;

interface InstallmentDetail {
    id: number;
    clientId: string;
    numberOfInstallments: number;
    installmentsPaid: number;
    modality: InstallmentModality;
    totalPaid: number;
    total: number;
    status: TicketStaus;
    createdAt: Date;
    installments: InstallmentsPaymentSchema[];
}

interface ClientSummary {
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
    globalInstallmentModality: InstallmentModality;
}
interface ClientDetail {
    id: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    creditLimit: number;
    clientCode: string;
    globalNumberOfInstallments: number;
    globalInstallmentModality: InstallmentModality;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    totalTickets: number;
    totalTicketsUnpaid: number;
    totalTicketsPaid: number;
    totalDebt: number;
    totalInstallments: number;
    lastTicketDate: Date | null;
}

interface Category {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
}

interface Paginated<T, Y> {
    items: T[];
    nextCursor: Y;
}

type Product = typeof products.$inferSelect & {
    category: {
        id: number;
        name: string;
    } | null;
};

declare const appRouter: _trpc_server.TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server.TRPCDefaultErrorShape;
    transformer: true;
}, _trpc_server.TRPCDecorateCreateRouterOptions<{
    products: _trpc_server.TRPCBuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
                searchQuery?: string | null | undefined;
            };
            output: Paginated<Product, {
                createdAt: Date | null;
                lastId: number | null;
            }>;
            meta: object;
        }>;
        findAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                products: {
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
                categories: {
                    isActive: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    id: number;
                    name: string;
                    description: string | null;
                }[];
            };
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                barcode: string;
                description: string;
                costPrice: number;
                salePrice: number;
                wholesalePrice: number;
                stock: number;
                minStock: number;
                categoryId?: number | null | undefined;
            };
            output: void;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                productId: number;
                data: {
                    barcode?: string | undefined;
                    description?: string | undefined;
                    costPrice?: number | undefined;
                    salePrice?: number | undefined;
                    wholesalePrice?: number | undefined;
                    stock?: number | undefined;
                    minStock?: number | undefined;
                    categoryId?: number | null | undefined;
                };
            };
            output: void;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                productId: number;
            };
            output: void;
            meta: object;
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
            meta: object;
        }>;
        findManyLastUpdatedProducts: _trpc_server.TRPCQueryProcedure<{
            input: Date;
            output: {
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
            meta: object;
        }>;
    }>>;
    categories: _trpc_server.TRPCBuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                limit: number;
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
                searchQuery?: string | null | undefined;
            };
            output: {
                items: Category[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description?: string | null | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    clients: _trpc_server.TRPCBuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        findMany: _trpc_server.TRPCQueryProcedure<{
            input: {
                cursor: {
                    createdAt?: Date | null | undefined;
                    lastClientCode?: string | null | undefined;
                };
                limit: number;
                searchQuery?: string | null | undefined;
            };
            output: Paginated<ClientSummary, {
                createdAt?: Date | null | undefined;
                lastClientCode?: string | null | undefined;
            }>;
            meta: object;
        }>;
        findOneBy: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId?: string | null | undefined;
                clientCode?: string | null | undefined;
            };
            output: ClientDetail;
            meta: object;
        }>;
        findManyInstallments: _trpc_server.TRPCQueryProcedure<{
            input: {
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
                limit: number;
                clientId: string;
            };
            output: {
                items: InstallmentDetail[];
                nextCursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
            };
            meta: object;
        }>;
        findManyPayments: _trpc_server.TRPCQueryProcedure<{
            input: {
                cursor: {
                    createdAt: Date | null;
                    lastId: number | null;
                };
                limit: number;
                clientId: string;
            };
            output: Paginated<PaymentSummary, {
                createdAt: Date | null;
                lastId: number | null;
            }>;
            meta: object;
        }>;
        createClient: _trpc_server.TRPCMutationProcedure<{
            input: {
                fullName: string;
                creditLimit: unknown;
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
            meta: object;
        }>;
        updateClient: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                fullName?: string | undefined;
                email?: string | null | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
                creditLimit?: unknown;
                clientCode?: string | undefined;
                globalNumberOfInstallments?: number | undefined;
                globalInstallmentModality?: "weekly" | "monthly" | "biweekly" | undefined;
                numberOfInstallments?: number | null | undefined;
                modality?: "weekly" | "monthly" | "biweekly" | null | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        payDebt: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                type: "pay_debt" | "settle_debt";
                amount?: number | null | undefined;
            };
            output: void;
            meta: object;
        }>;
        deleteManyPayments: _trpc_server.TRPCMutationProcedure<{
            input: {
                ids: number[];
                clientId: string;
            };
            output: [void, _libsql_client.ResultSet, void];
            meta: object;
        }>;
    }>>;
    tickets: _trpc_server.TRPCBuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                payType: "cash" | "credit";
                items: {
                    productId: number;
                    description: string;
                    price: number;
                    quantity: number;
                }[];
                clientId?: string | null | undefined;
            };
            output: void;
            meta: object;
        }>;
        findManyByClient: _trpc_server.TRPCQueryProcedure<{
            input: {
                clientId: string;
            };
            output: {
                items: {
                    id: number;
                    productId: number;
                    description: string;
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
                status: "unpaid" | "partial" | "paid";
                payType: "cash" | "credit" | null;
            }[];
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                clientId: string;
                ticketId: number;
            };
            output: [_libsql_client.ResultSet, void];
            meta: object;
        }>;
    }>>;
    greets: _trpc_server.TRPCQueryProcedure<{
        input: void;
        output: string;
        meta: object;
    }>;
}>>;
type AppRouter = typeof appRouter;

export type { AppRouter };
