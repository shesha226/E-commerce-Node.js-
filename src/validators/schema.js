const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID");

const userRegisterSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).min(2),
        email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
        password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 chars"),
        phone: z.string().optional(),
        role: z.enum(["user", "admin"]).optional()
    })
});

const userLoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
});

const userAddressSchema = z.object({
    body: z.object({
        userId: objectIdSchema,
        address: z.string({ required_error: "Address is required" }),
        city: z.string({ required_error: "City is required" }),
        state: z.string().optional(),
        zip: z.string({ required_error: "Zip code is required" }),
        country: z.string({ required_error: "Country is required" })
    })
});


const userPaymentSchema = z.object({
    body: z.object({
        userId: objectIdSchema,
        paymentMethod: z.string({ required_error: "Payment Method is required" }),
        provider: z.string().optional(),
        accountNo: z.string().optional()
    })
});

const categorySchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Category Name is required" }),
        description: z.string().optional()
    })
});


const productSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Product Name is required" }),
        description: z.string().optional(),
        price: z.number({ required_error: "Price is required" }).positive("Price must be positive"),
        stock: z.number({ required_error: "Stock is required" }).int().nonnegative("Stock cannot be negative"),
        image: z.string().url().optional(),
        category: objectIdSchema
    })
});

const cartItemSchema = z.object({
    body: z.object({
        userId: objectIdSchema,
        productId: objectIdSchema,
        quantity: z.number().min(1, "Quantity must be at least 1")
    })
});

const createOrderSchema = z.object({
    body: z.object({
        userId: objectIdSchema,
        totalAmount: z.number().positive(),
        status: z.enum(["pending", "completed", "cancelled"]).optional(),
        paymentId: objectIdSchema.optional(),
        shippingAddress: z.string({ required_error: "Shipping Address is required" }),
        paymentMethod: z.string({ required_error: "Payment Method is required" }),


        items: z.array(z.object({
            productId: objectIdSchema,
            quantity: z.number().min(1),
            price: z.number().optional()
        })).nonempty("Order must have at least one item")
    })
});

const orderDetailsSchema = z.object({
    body: z.object({
        orderId: objectIdSchema,
        productId: objectIdSchema,
        quantity: z.number().min(1),
        totalPrice: z.number().nonnegative(),
        status: z.enum(["pending", "completed", "cancelled"]).optional()
    })
});

const idParamSchema = z.object({
    params: z.object({
        id: objectIdSchema
    })
});


module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userAddressSchema,
    userPaymentSchema,
    categorySchema,
    productSchema,
    cartItemSchema,
    createOrderSchema,
    orderDetailsSchema,
    idParamSchema
};





