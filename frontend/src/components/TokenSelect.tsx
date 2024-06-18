"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "./ui/use-toast"
// import { Slider } from "./ui/slider"
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

const FormSchema = z.object({
  token: z.string({
    required_error: "Select a token to connect",
  }),
})

const marks: SliderSingleProps['marks'] = {
  0: {
    style: {
      color: '#ffffff',
    },
    label: <p className="text-sm">0.05 </p>,
  },
  25: {
    style: {
      color: '#ffffff',
    },
    label: <p className="text-sm">0.1</p>,
  },
  50: {
    style: {
      color: '#ffffff',
    },
    label: <p className="text-sm">0.5</p>,
  },
  75: {
    style: {
      color: '#ffffff',
    },
    label: <p className="text-sm">1</p>,
  },
  100: {
    style: {
      color: '#ffffff',
    },
    label: <p className="text-sm">1.5</p>,
  },
};
export default function TokenSelect() {
  // const [currentSliderIndex, setCurrentSliderIndex] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  // const ethereumValues: Array<number> = [0.05, 0.1, 0.5, 1, 2.5]
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 relative"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue="Eth">
                <FormControl>
                  <SelectTrigger className="border-primary focus:outline-none focus:shadow-none active:outline-none shadow-none outline-none">
                    <SelectValue defaultValue="ETH" placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="overflow-hidden absolute z-100 bg-black border-primary">
                  <SelectItem value="Eth">ETH</SelectItem>
                  <SelectItem value="Starknet">STARK</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Slider
          max={4}
          min={0}
          step={1}
          onValueChange={(value: number[]) => setCurrentSliderIndex(value[0])}
          className="bg-transparent"
        /> */}
        <Slider marks={marks} step={null} defaultValue={20} onChange={(value)=>setCurrentValue(value)} 
          />
        <p>current value: {currentValue}</p>
        {/* @ts-ignore */}
        {/* // fix needed color is not being applied */}
        <Button type="submit" className="bg-primary w-full">
          Connect
        </Button>
      </form>
    </Form>
  )
}
