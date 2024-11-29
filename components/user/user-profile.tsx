"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect, useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";

import {useAppStore} from "@/store";
import {FormError} from "./form/form-error";
import {UpdateProfileSchema} from "@/schemas";
import {FormSuccess} from "./form/form-success";
import {updateUserDetails} from "@/actions/user";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const UserProfile = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const {userDetails} = useAppStore();
    console.log('userDetails', userDetails);

    const form = useForm({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            title: "",
            fName: "",
            mName: "",
            lName: "",
            gender: "",
            emailId: "",
        },
    });

    useEffect(() => {
        if (userDetails) {
            form.reset({
                title: userDetails?.title || "",
                fName: userDetails?.firstName || userDetails?.name?.split(" ")[0] || "",
                mName: userDetails?.middleName || "",
                lName: userDetails?.lastName || userDetails?.name?.split(" ")[1] || "",
                gender: userDetails?.gender || "",
                emailId: userDetails?.email || "",
            });
        }
    }, [userDetails, form]);

    const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            if (userDetails?.email) {
                const {error, success} = await updateUserDetails(
                    values,
                    userDetails?.email
                );
                if (error) {
                    setError(error);
                } else {
                    setSuccess(success);
                    router.push("/");
                }
            }
        });
        form.reset();
    };
    const isLoading = form.formState.isSubmitting;
    return (
        <div className="text-primary-white w-full ">
            <div className="my-8 text-3xl font-bold ">
                <p>My Profile Page</p>
            </div>
            <div className={'flex justify-center items-center md:hidden'}>
                <Avatar className={'h-20 w-20'}>
                    {userDetails?.image ? (
                        <AvatarImage src={userDetails?.image}/>
                    ) : (
                        <AvatarFallback className={'text-2xl text-black bg-secondary-txt'}>
                            {userDetails?.name
                                ? userDetails.name
                                : 'NA'}
                        </AvatarFallback>
                    )}
                </Avatar>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div>
                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Title
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
                                                        className=" text-primary-white text-sm sm:text-base md:text-xl bg-secondary-dark outline-none border-gray-500">
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Mr">
                                                            Mr
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Mrs">
                                                            Mrs
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Miss">
                                                            Miss
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Ms">
                                                            Ms
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Prof">
                                                            Prop
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Dr">
                                                            Dr
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fName"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5  text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your First Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                <FormField
                                    control={form.control}
                                    name="mName"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Middle Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5  text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your Middle Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lName"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="md:py-5  text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your Last Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Gender
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
                                                        className="md:py-5  text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500">
                                                        <SelectValue placeholder=""/>
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        className="md:py-5  text-primary-white text-sm sm:text-base md:text-xl bg-secondary-dark outline-none border-gray-500">
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Mr">
                                                            Female
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Mrs">
                                                            Male
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Miss">
                                                            Transgender
                                                        </SelectItem>
                                                        <SelectItem className="text-sm sm:text-base md:text-xl"
                                                                    value="Ms">
                                                            {`I'd rathernot say`}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailId"
                                    render={({field}) => (
                                        <FormItem className="my-5">
                                            <FormLabel className="text-sm sm:text-base md:text-xl font-medium my-2">
                                                Email Id
                                            </FormLabel>
                                            <FormControl>
                                                <Input

                                                    disabled
                                                    className="md:py-5 text-sm sm:text-base md:text-xl bg-transparent outline-none border-gray-500"
                                                    placeholder="Enter your email id"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <div className="w-full flex justify-center md:block">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="px-10 bg-primary-btn hover:bg-primary-btn text-sm sm:text-base md:text-xl text-black"
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

export default UserProfile;

//
// {/* <Input
//                           disabled={isLoading}
//                           className="py-7 text-lg bg-transparent outline-none border-gray-500"
//                           placeholder="Enter your Email Id"
//                           {...field}
//                         /> */}
