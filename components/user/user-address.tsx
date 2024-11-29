"use client";

import * as z from "zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";

import {useAppStore} from "@/store";
import {FormError} from "./form/form-error";
import {UpdateAddressSchema} from "@/schemas";
import {FormSuccess} from "./form/form-success";
import {updateUserAddress} from "@/actions/address";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const UserAddress = () => {
    const router = useRouter();
    // const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const {userAddress, userDetails} = useAppStore();

    const form = useForm({
        resolver: zodResolver(UpdateAddressSchema),
        defaultValues: {
            mobileno: "",
            addressNickName: "",
            pincode: "",
            flateNOBuildingNOCompanyStreet: "",
            landMark: "",
            localitySectorArea: "",
            state: "",
            city: "",
            addressType: "",
        }
    })

    useEffect(() => {
        if (userAddress) {
            form.reset({
                mobileno: userAddress?.mobileno ?? "",
                addressNickName: userAddress?.addressNickName ?? "",
                pincode: userAddress?.pincode ?? "",
                flateNOBuildingNOCompanyStreet:
                    userAddress?.flateNOBuildingNOCompanyStreet ?? "",
                landMark: userAddress?.landMark ?? "",
                localitySectorArea: userAddress?.localitySectorArea ?? "",
                state: userAddress?.state ?? "",
                city: userAddress?.city ?? "",
                addressType: userAddress?.addressType ?? "",
            })
        }
    }, [userAddress, form])

    const onSubmit = async (values: z.infer<typeof UpdateAddressSchema>) => {
        try {
            if (userDetails?.id) {
                const {error, success} = await updateUserAddress(
                    values,
                    userDetails?.id
                );
                if (success) {
                    setSuccess(success);
                    router.push("/");
                }
                setError(error);
            }
            form.reset();
        } catch (error) {
            console.error("Error updating address:", error);
            setError("Failed to update address.");
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="text-primary-white w-full h-full">
            <div className="my-10 text-2xl sm:text-3xl md:text-3xl font-bold">
                <p>My Address</p>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="">
                            {/* Mobile No */}
                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                <FormField
                                    control={form.control}
                                    name="mobileno"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Mobile No.
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your Mobile No"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Address Nick Name */}
                                <FormField
                                    control={form.control}
                                    name="addressNickName"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Address Nick Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your address nick name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                {/* Pin Code */}
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Pin Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your pin code"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Flat No/Building No/Company Street */}
                                <FormField
                                    control={form.control}
                                    name="flateNOBuildingNOCompanyStreet"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Flat No/Building No/Company Street
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your flat/building/company street"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                {/* Landmark */}
                                <FormField
                                    control={form.control}
                                    name="landMark"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Landmark
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your landmark"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Locality/Sector/Area */}
                                <FormField
                                    control={form.control}
                                    name="localitySectorArea"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Locality/Sector/Area
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your locality/sector/area"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                {/* State */}
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                State
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your state"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* City */}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                City
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your city"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                {/* Address Type */}
                                <FormField
                                    control={form.control}
                                    name="addressType"
                                    render={({field}) => (
                                        <FormItem className="mb-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Address Type
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger
                                                        className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500">
                                                        <SelectValue placeholder=""/>
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        className="md:py-5 text-primary-white text-sm sm:text-base md:text-xl bg-secondary-dark outline-none border-gray-500">
                                                        <SelectItem className="text-sm sm:text-base md:text-xl" value="Home">
                                                            Home
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl" value="Work">
                                                            Work
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl" value="Other">
                                                            Other
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <div className="w-full flex justify-center">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="px-10 text-sm sm:text-base md:text-xl bg-primary-btn hover:bg-primary-btn text-black"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UserAddress;
