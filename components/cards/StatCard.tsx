"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Props{
    title:string;
    number:number;
    suffix?:string;
    icon:any;
}

export default function StatCard({
    title,
    number,
    suffix="+",
    icon:Icon,
}:Props){

const {ref,inView}=useInView({
triggerOnce:true
});

return(

<div
ref={ref}
className="rounded-2xl border border-cyan-500/20 bg-[#0b0b0b] p-8 hover:border-cyan-400 transition duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,.15)]"
>

<div className="mb-6">

<Icon
size={36}
className="text-cyan-400"
/>

</div>

<h3 className="text-5xl font-bold text-white">

{inView &&
<CountUp
end={number}
duration={2}
/>
}

{suffix}

</h3>

<p className="mt-3 text-gray-400">
{title}
</p>

</div>

);

}