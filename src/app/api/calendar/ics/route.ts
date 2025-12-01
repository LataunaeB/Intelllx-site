import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/calendar/ics
 * Generates a downloadable .ics calendar file for universal calendar support
 * Query params:
 * - title: string
 * - start: string (YYYYMMDDTHHMMSSZ)
 * - end: string (YYYYMMDDTHHMMSSZ)
 * - desc: string
 * - loc: string (meeting link or location)
 * - attendee: string (email)
 * - uid: string (unique id)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Meeting';
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const desc = searchParams.get('desc') || '';
  const loc = searchParams.get('loc') || '';
  const attendee = searchParams.get('attendee') || '';
  const uid = searchParams.get('uid') || `intelllx-${Date.now()}@intelllx.com`;

  if (!start || !end) {
    return NextResponse.json({ error: 'Missing start or end' }, { status: 400 });
  }

  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const safeDesc = desc.replace(/\r?\n/g, '\\n').replace(/,/g, '\\,');

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Intelllx//Booking//EN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${safeDesc}\\nJoin link: ${loc}
LOCATION:${loc}
${attendee ? `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:MAILTO:${attendee}` : ''}
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="meeting.ics"',
      'Cache-Control': 'no-store',
    },
  });
}





