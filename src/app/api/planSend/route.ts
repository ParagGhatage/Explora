
import { Resend } from 'resend';
import { NextRequest,NextResponse } from 'next/server';
import PlanEmailTemplate from '@/components/Resend/plan-email-template';
import { act } from 'react';

const resend = new Resend("re_iEe14MHZ_9i5yP1ycxfuzXYta1TbwUy2s");

export async function POST(req:any) {
  try {

    const reqbody = await req.json()
        console.log(reqbody)
        const {name,email, accommodation, transportation, budget, activities, packingList } = reqbody

    const { data, error } = await resend.emails.send({
      from: 'VoyageVista <onboarding@paragghatage.com>',
      to: email,
      subject: 'Travel Plan',
      react: PlanEmailTemplate({name:name,email:email,accommodation:accommodation,transportation:transportation,budget:budget,activities:activities,packingList:packingList}),
      text:"nothing"
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
