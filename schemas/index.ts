import * as z from "zod";

  export const LoginSchema = z.object({
    email: z.string()
      .min(1, { message: 'Email is required' })
      .refine(email => email.endsWith('.com'), {
        message: "Email must end with .com"
      }),
    password: z.string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
      .regex(/\d/, { message: "Password must contain at least one number" })
  });

export const CategorySchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category name required",
  }),
});

export const ProductSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name required",
  }),
  // description: z.string().min(1, {
  //   message: "Product description required",
  // }),
  category: z.string().min(1, {
    message: "Category required",
  }),
  price: z.string().min(1, {
    message: "Price required",
  }),
  discount: z.string().min(0).max(100),
  qty: z.string().min(1, {
    message: "Quantity required",
  }),
});

export const UpdateProfileSchema = z.object({
  title: z.string().optional(),
  fName: z.string().optional(),
  mName: z.string().optional(),
  lName: z.string().optional(),
  gender: z.string().optional(),
  emailId: z.string().email().min(1, {
    message: "Email is required.",
  }),
});

export const UpdateAddressSchema = z.object({
  userId: z.string().optional(), 
  mobileno: z.string().min(1, {
    message: "Mobile Number is required.",
  }), 
  addressNickName: z.string().min(1, {
    message: "Address Nick Name is required.",
  }), 
  pincode: z.string().min(1, {
    message: "Pincode is required.",
  }),
  flateNOBuildingNOCompanyStreet: z.string().optional(),
  landMark: z.string().min(1, {
    message: "LandMark is required.",
  }), 
  localitySectorArea: z.string().min(1, {
    message: "Locality/Sector/Area is required.",
  }), 
  state: z.string().min(1, {
    message: "State is required.",
  }), 
  city: z.string().min(1, {
    message: "City is required.",
  }), 
  addressType: z.string().min(1, {
    message: "Address Type is required.",
  }), 
});


export const ReviewSchema = z.object({
  reviewDescription: z.string().min(1, {
    message: "Review is required.",
  }),
  rating: z
    .string()
    .min(1, {
      message: "Rating must be at least 1.",
    })
    .max(5, {
      message: "Rating must be at most 5.",
    })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5;
      },
      {
        message:
          "Rating must be a number between 1 and 5, with up to one decimal place.",
      }
    )
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        
        const isIntegerOrOneDecimalPlace =
          Number.isInteger(parsedValue) || (parsedValue * 10) % 10 === 0;
        return isIntegerOrOneDecimalPlace;
      },
      {
        message:
          "Rating must be a whole number or a floating point value with up to one decimal place between 1 and 5.",
      }
    ),
});
