"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";
import { Slider } from "antd";
import type { SliderSingleProps } from "antd";

const FormSchema = z.object({
  token: z.string().nonempty("Select a token to connect"),
});

const marks: SliderSingleProps["marks"] = {
  0: {
    style: {
      color: "#ffffff",
    },
    label: <p className="text-sm">0.05</p>,
  },
  25: {
    style: {
      color: "#ffffff",
    },
    label: <p className="text-sm">0.5</p>,
  },
  50: {
    style: {
      color: "#ffffff",
    },
    label: <p className="text-sm">1</p>,
  },
  75: {
    style: {
      color: "#ffffff",
    },
    label: <p className="text-sm">5</p>,
  },
  100: {
    style: {
      color: "#ffffff",
    },
    label: <p className="text-sm">10</p>,
  },
};

const valueMap = {
  0: 0.05,
  25: 0.5,
  50: 1,
  75: 5,
  100: 10,
} as const;

export default function TokenSelect() {
  const [currentValue, setCurrentValue] = useState<0.05 | 0.5 | 1 | 5 | 10>(valueMap[0]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 select-none relative"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="Eth">
                <FormControl>
                  <SelectTrigger className="border-primary focus:outline-none select-none focus:shadow-none active:outline-none shadow-none outline-none">
                    <SelectValue defaultValue="ETH" placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="overflow-hidden absolute select-none z-100 bg-black border-primary">
                  <SelectItem value="Eth">ETH</SelectItem>
                  <SelectItem value="Starknet">STARK</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Slider
          marks={marks}
          step={null}
          defaultValue={0}
          onChange={(value) =>
            setCurrentValue(valueMap[value as keyof typeof valueMap])
          }
        />
        <p className="mt-2">current value: {currentValue}</p>
        <Button type="submit" className="bg-primary w-full">
          Connect
        </Button>
      </form>
    </Form>
  );
}
