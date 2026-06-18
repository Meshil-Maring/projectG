import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'projectgmanipur@gmail.com';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'S83_Projec_382@8f';

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Administrator',
      password: await bcrypt.hash(password, 12),
      role: 'ADMIN',
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);

  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main' },
  });

  if ((await prisma.homeVideo.count()) === 0) {
    await prisma.homeVideo.createMany({
      data: [
        {
          title: 'Every Step We Take, Creates a Better Tomorrow',
          description:
            'See how your support helps us bring hope, opportunities, and change to those who need it most.',
          thumbnail: '/src/assets/image/family.jpeg',
          youtubeId: 'lArdfIpLlAA',
          duration: '—',
          order: 0,
        },
        {
          title: 'Planting Seeds of Change for Future Generations',
          description:
            'Join us as we transform barren landscapes into thriving green spaces for communities in need.',
          thumbnail: '/src/assets/image/planting_tree.png',
          videoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          duration: '10:54',
          order: 1,
        },
        {
          title: 'Your Donation Changes Lives Every Single Day',
          description:
            'Witness the real-world impact of every rupee donated — from meals to medicine to education.',
          thumbnail: '/src/assets/image/donate.png',
          videoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          duration: '0:15',
          order: 2,
        },
        {
          title: 'Together We Build a Greener, Fairer World',
          description:
            'Our volunteers and partners unite across borders to create lasting change for vulnerable families.',
          thumbnail:
            'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
          videoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          duration: '12:14',
          order: 3,
        },
      ],
    });
  }

  if ((await prisma.galleryPhoto.count()) === 0) {
    await prisma.galleryPhoto.createMany({
      data: [
        {
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=90',
          alt: 'Children Planting Trees',
          description:
            'Young community members learn environmental stewardship by planting trees in their neighborhood park — one sapling at a time, they are reshaping the future.',
          order: 0,
        },
        {
          src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=90',
          alt: 'Children Having a Meal',
          description:
            'Nutritious meals are provided daily to over 500 children through our feeding program, ensuring no child has to study on an empty stomach.',
          order: 1,
        },
        {
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=90',
          alt: 'Doctor With Students',
          description:
            'Healthcare volunteers bring free medical check-ups and health education to underserved school communities, bridging the gap between care and access.',
          order: 2,
        },
        {
          src: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=90',
          alt: 'Children Raising Hands',
          description:
            'Eager students participate in our after-school learning program, breaking barriers to quality education and discovering the joy of curiosity.',
          order: 3,
        },
        {
          src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=90',
          alt: 'Volunteer Distributing Supplies',
          description:
            'Dedicated volunteers distribute emergency relief kits to families in need, bringing warmth, dignity, and hope during the most difficult times.',
          order: 4,
        },
        {
          src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=90',
          alt: 'Education for All',
          description:
            'Books and learning materials donated to rural schools where resources are scarce — because every child deserves the tools to dream bigger.',
          order: 5,
        },
        {
          src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90',
          alt: 'Environment Protection',
          description:
            'Community-led clean energy and conservation initiatives help reduce carbon footprints across rural villages, protecting nature for generations to come.',
          order: 6,
        },
        {
          src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=90',
          alt: 'Community Gathering',
          description:
            'Neighbors unite at our annual community fair to celebrate shared progress, strengthen bonds, and plan a brighter future together.',
          order: 7,
        },
      ],
    });
  }

  if ((await prisma.impactStat.count()) === 0) {
    await prisma.impactStat.createMany({
      data: [
        { iconKey: 'Users', value: '25K+', label: 'Lives\nImpacted', order: 0 },
        { iconKey: 'GraduationCap', value: '10K+', label: 'Children\nEducated', order: 1 },
        { iconKey: 'Leaf', value: '150+', label: 'Communities\nServed', order: 2 },
        { iconKey: 'HandHeart', value: '500+', label: 'Volunteers\nWorldwide', order: 3 },
      ],
    });
  }

  if ((await prisma.story.count()) === 0) {
    await prisma.story.createMany({
      data: [
        {
          image: '',
          quote: 'Thanks to the scholarship, I am now able to study and dream of a better future.',
          name: 'Aarav Kumar',
          role: 'Scholarship Recipient',
          location: 'Imphal, Manipur',
          year: '2023',
          fullStory: "Aarav grew up in a small household where his parents worked as daily labourers. When the scholarship programme found him in Class 9, he was on the verge of dropping out. With the support he received, Aarav completed his Class 12 with distinction and is now pursuing a bachelor's degree in computer science. He dreams of returning to his village and teaching coding to children who, like him, might otherwise have lost hope.",
          order: 0,
        },
        {
          image: '',
          quote: 'The support we received helped us rebuild our home and live with dignity again.',
          name: 'Sunita Devi',
          role: 'Community Beneficiary',
          location: 'Thoubal, Manipur',
          year: '2022',
          fullStory: "When a flood destroyed Sunita's home in 2022, she had nothing left but hope. Project Generation's disaster relief team reached her village within days, providing temporary shelter, food, and rebuilding support. Today, Sunita's family lives in a stronger home and she has joined our community volunteer network to help others in times of crisis.",
          order: 1,
        },
        {
          image: '',
          quote: 'Volunteering here has been the most meaningful experience of my life.',
          name: 'Rohan Mehta',
          role: 'Volunteer',
          location: 'Bishnupur, Manipur',
          year: '2024',
          fullStory: 'Rohan first joined Project Generation as a college student looking for meaningful ways to contribute. What started as weekend teaching sessions soon turned into a full commitment. He now leads a team of 20 volunteers coordinating health camps and education drives across three districts. "I came to give," he says, "but I received so much more in return."',
          order: 2,
        },
        {
          image: '',
          quote: "Every contribution transformed not just my child's future but our entire community.",
          name: 'Priya Sharma',
          role: 'Parent Beneficiary',
          location: 'Churachandpur, Manipur',
          year: '2023',
          fullStory: "Priya's daughter, Deepa, was one of 60 children enrolled in our after-school learning programme. Before joining, Deepa could barely read. Within a year, she stood first in her class. Priya, moved by the transformation, began attending our parent awareness sessions and is now an advocate for girls' education in her neighbourhood.",
          order: 3,
        },
        {
          image: '',
          quote: 'I never imagined clean water would change everything — it truly gave us a new life.',
          name: 'Meera Nair',
          role: 'Village Resident',
          location: 'Senapati, Manipur',
          year: '2021',
          fullStory: "For years, Meera's village depended on a contaminated well that made children sick every monsoon. Project Generation's water sanitation project installed a filtration system and educated families on hygiene practices. Waterborne illnesses in the village dropped by 80% in the following year. Meera says clean water did not just save lives — it gave the village back its dignity.",
          order: 4,
        },
        {
          image: '',
          quote: 'The skills training I received opened doors I never knew existed.',
          name: 'Samuel Osei',
          role: 'Vocational Graduate',
          location: 'Kangpokpi, Manipur',
          year: '2023',
          fullStory: 'Samuel enrolled in our six-month electrician training programme with barely a Class 8 education and no income. By the end, he had passed the certification and secured his first contract. He now runs a small electrical services business employing two assistants from his community. "I used to wonder if someone like me could ever build something," he says. "Now I know I can."',
          order: 5,
        },
        {
          image: '',
          quote: 'Seeing my students read their first sentence was worth more than words can express.',
          name: 'Fatima Al-Hassan',
          role: 'Community Teacher',
          location: 'Ukhrul, Manipur',
          year: '2024',
          fullStory: "Fatima came to the literacy programme as a participant — a mother of three who had never been to school. After learning to read and write, she surprised everyone by asking to stay on as a teacher's aide. Today she runs evening classes for women in her own lane, teaching reading, numeracy, and basic health literacy. She believes every woman who learns becomes a teacher herself.",
          order: 6,
        },
        {
          image: '',
          quote: 'From receiving help to leading others — that journey is something I cherish forever.',
          name: 'Diego Reyes',
          role: 'Farmer & Community Trainer',
          location: 'Pherzawl, Manipur',
          year: '2022',
          fullStory: "Diego was once a struggling farmer who had lost three consecutive harvests to poor soil management. After attending Project Generation's agriculture training workshops, he learned about crop rotation and organic composting. His yield doubled in the first season. He then trained 30 other farmers in his area, and their collective income rose by an average of 40%. Diego now leads our agricultural mentorship circle.",
          order: 7,
        },
      ],
    });
  }

  if ((await prisma.activity.count()) === 0) {
    const activities: Record<string, { title: string; desc: string }[]> = {
      whg: [
        { title: 'Community Health Camp', desc: 'Free health screenings and wellness checkups organized for underprivileged families across the community.' },
        { title: 'Nutrition & Meal Drive', desc: 'Distributing nutritious meals and food kits to families in need during challenging times.' },
        { title: 'Environment Cleanliness Drive', desc: 'Area cleaning campaigns and tree plantation activities bringing communities together for a greener future.' },
        { title: 'Elderly Care Visit', desc: 'Spending meaningful time with senior residents, offering companionship, care, and essential support.' },
        { title: 'Child Welfare Program', desc: "Educational sessions and learning material distribution to support children's growth and development." },
        { title: 'Disaster Relief Operation', desc: 'Emergency aid, supplies, and rehabilitation support provided to families affected by natural disasters.' },
      ],
      hrds: [
        { title: 'Youth Empowerment Workshop', desc: 'Hands-on skill-building sessions helping young adults discover their potential and chart a path forward.' },
        { title: 'Women Leadership Training', desc: 'Empowering women with confidence, leadership skills, and communication tools to lead in their communities.' },
        { title: 'Career Development Fair', desc: 'Connecting youth and job seekers with mentors, employers, and opportunities for professional growth.' },
        { title: 'Digital Literacy Program', desc: 'Teaching essential digital and technology skills to prepare community members for a modern workforce.' },
        { title: 'Mentorship & Coaching Sessions', desc: 'One-on-one guidance from experienced professionals supporting individuals on their personal growth journey.' },
        { title: 'Scholarship & Awards Ceremony', desc: 'Recognizing and celebrating outstanding students with scholarships and resources to continue their education.' },
      ],
      cwg: [
        { title: 'Inter-School Quiz Championship', desc: 'Testing knowledge and fostering academic excellence through competitive quizzes across schools and colleges.' },
        { title: 'Annual Sports Meet', desc: 'Promoting physical fitness, teamwork, and sportsmanship through organized sports and athletic events.' },
        { title: 'Debate & Elocution Contest', desc: 'Building public speaking, critical thinking, and argumentation skills in a competitive setting.' },
        { title: 'Science & Innovation Fair', desc: 'Encouraging scientific curiosity and creative problem-solving among students with hands-on projects.' },
        { title: 'Cultural Arts Festival', desc: 'Celebrating diverse talents through music, drama, and visual arts performances open to all.' },
        { title: 'Leadership Development Camp', desc: 'Intensive programs building confidence, teamwork, and leadership abilities in young participants.' },
      ],
      fseds: [
        { title: 'Entrepreneurship Bootcamp', desc: 'Guiding aspiring entrepreneurs through business planning, pitching, and launch strategies in hands-on sessions.' },
        { title: 'Agricultural Market Connect', desc: 'Linking farmers directly to buyers and markets for fair prices, better income, and stronger livelihoods.' },
        { title: "Women's Self-Help Group Formation", desc: 'Organizing SHGs to empower women with savings, credit access, and economic independence in their communities.' },
        { title: 'Financial Literacy Camp', desc: 'Teaching communities about budgeting, savings, credit management, and responsible financial planning.' },
        { title: 'Vocational Skills Training', desc: 'Hands-on training in marketable trades to enhance employability and open new income opportunities.' },
        { title: 'Rural Infrastructure Development', desc: 'Building essential community facilities and infrastructure to support sustainable and resilient local growth.' },
      ],
      lac: [
        { title: 'Legal Awareness Camp', desc: 'Interactive sessions educating communities about fundamental rights, laws, and their entitlements as citizens.' },
        { title: 'Free Legal Consultation Drive', desc: 'Offering free legal advice and guidance to individuals navigating complex personal and civil legal matters.' },
        { title: 'Constitutional Literacy Program', desc: 'Teaching constitutional rights and civic duties through engaging discussions, activities, and real-world scenarios.' },
        { title: "Women's Legal Rights Workshop", desc: 'Empowering women with knowledge of domestic laws, property rights, and protection mechanisms available to them.' },
        { title: 'RTI Training Workshop', desc: 'Educating citizens on effectively using the Right to Information Act to access public records and hold officials accountable.' },
        { title: 'Street Plays on Legal Awareness', desc: 'Using performing arts and street theatre to spread legal literacy in an accessible and engaging way for communities.' },
      ],
    };

    for (const [group, items] of Object.entries(activities)) {
      await prisma.activity.createMany({
        data: items.map((item, order) => ({ group, ...item, imageUrl: '', order })),
      });
    }
  }

  if ((await prisma.boardMember.count()) === 0) {
    await prisma.boardMember.createMany({
      data: [
        { name: 'Justice R.S. Sharma (Retd.)', role: 'Chairman', badge: 'Chairman', color: '#1a3270', order: 0 },
        { name: 'Dr. Meena Pillai', role: 'Vice Chairperson', badge: 'Vice Chair', color: '#2563eb', order: 1 },
        { name: 'Adv. Suresh Rajan', role: 'Secretary General', badge: 'Secretary', color: '#1a3270', order: 2 },
      ],
    });
  }

  const whgPage = await prisma.page.upsert({
    where: { slug: 'whg' },
    update: {},
    create: { slug: 'whg', title: 'Work for Humanity Group' },
  });

  if ((await prisma.section.count({ where: { pageId: whgPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: whgPage.id,
          type: 'whg-hero',
          order: 0,
          data: {
            eyebrow: 'Work for Humanity Group',
            titleLine1: 'Work for Humanity,',
            titleEmphasis: 'Serve with Heart.',
            description:
              "We work for a world where kindness leads the way. We uplift lives, support communities, and create lasting change through service and compassion.",
          },
        },
        {
          pageId: whgPage.id,
          type: 'whg-mission',
          order: 1,
          data: {
            eyebrow: 'OUR MISSION',
            headingLine1: 'Empathy in Action.',
            headingLine2: 'Change in Motion.',
            description:
              "We believe every act of kindness creates ripples of change. Our mission is to serve humanity by addressing real needs, spreading kindness, and empowering people to live with dignity and hope.",
          },
        },
        {
          pageId: whgPage.id,
          type: 'whg-cta',
          order: 2,
          data: {
            headingLine1: 'Small Actions.',
            headingLine2: 'Big Impact.',
            description: 'Together, we can build a kinder, stronger, and more compassionate world.',
          },
        },
        {
          pageId: whgPage.id,
          type: 'whg-activities',
          order: 3,
          data: {
            doEyebrow: 'What We Do',
            doHeading: 'How We Serve',
            focusEyebrow: 'Our Focus Areas',
            focusHeading: 'Where We Make a Difference',
            impactEyebrow: 'Our Impact',
            galleryEyebrow: 'Our Activities',
            galleryHeading: "What We've Been Doing",
          },
        },
        {
          pageId: whgPage.id,
          type: 'whg-communities',
          order: 4,
          data: {
            heading: 'Explore Our Other Communities',
          },
        },
      ],
    });
  }

  const hrdsPage = await prisma.page.upsert({
    where: { slug: 'hrds' },
    update: {},
    create: { slug: 'hrds', title: 'Human Resources Developmental Society' },
  });

  if ((await prisma.section.count({ where: { pageId: hrdsPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: hrdsPage.id,
          type: 'hrds-hero',
          order: 0,
          data: {
            eyebrow: 'Human Resources Developmental Society',
            titleLine1: 'Empower People.',
            titleEmphasis1: 'Enrich Potential.',
            titleEmphasis2: 'Build a Better Tomorrow.',
            description:
              'We are committed to developing human potential and building capacities to create a skilled, confident, and empowered community.',
          },
        },
        {
          pageId: hrdsPage.id,
          type: 'hrds-mission',
          order: 1,
          data: {
            eyebrow: 'OUR MISSION',
            headingLine1: 'Developing People.',
            headingLine2: 'Transforming Lives.',
            description:
              'We focus on nurturing talent, enhancing skills, and promoting personal and professional growth through education, training, mentorship, and opportunities.',
          },
        },
        {
          pageId: hrdsPage.id,
          type: 'hrds-cta',
          order: 2,
          data: {
            eyebrow: 'BE THE CHANGE',
            headingLine1: 'Together, We Develop',
            headingLine2: 'Stronger Communities.',
            description:
              'Your participation creates ripples of growth. Join us in shaping a skilled and empowered society.',
          },
        },
        {
          pageId: hrdsPage.id,
          type: 'hrds-activities',
          order: 3,
          data: {
            doEyebrow: 'WHAT WE DO',
            focusEyebrow: 'OUR FOCUS AREAS',
            impactEyebrow: 'OUR IMPACT',
            galleryEyebrow: 'Our Activities',
            galleryHeading: "What We've Been Doing",
          },
        },
        {
          pageId: hrdsPage.id,
          type: 'hrds-communities',
          order: 4,
          data: {
            heading: 'Explore Our Other Communities',
          },
        },
      ],
    });
  }

  const cwgPage = await prisma.page.upsert({
    where: { slug: 'cwg' },
    update: {},
    create: { slug: 'cwg', title: 'Competitive World Group' },
  });

  if ((await prisma.section.count({ where: { pageId: cwgPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: cwgPage.id,
          type: 'cwg-hero',
          order: 0,
          data: {
            eyebrow: 'Competitive World Group',
            titleLine1: 'Sharpen Minds.',
            titleEmphasis1: 'Shape Champions.',
            titleEmphasis2: 'Build a Legacy of Excellence.',
            description:
              'We prepare individuals to compete, excel, and win — fostering a culture of academic rigor, athletic discipline, and creative brilliance across every arena.',
          },
        },
        {
          pageId: cwgPage.id,
          type: 'cwg-mission',
          order: 1,
          data: {
            eyebrow: 'OUR MISSION',
            headingLine1: 'Empowering People.',
            headingLine2: 'Strengthening Livelihoods.',
            headingLine3: 'Transforming Communities.',
            description:
              'Our mission is to cultivate a competitive, growth-driven culture by providing platforms, training, and mentorship that help individuals achieve their highest potential in academics, sports, and beyond.',
          },
        },
        {
          pageId: cwgPage.id,
          type: 'cwg-cta',
          order: 2,
          data: {
            eyebrow: 'RISE TO THE CHALLENGE',
            headingLine1: 'Empowered communities.',
            headingLine2: 'Stronger economies.',
            headingLine3: 'Brighter futures.',
            description:
              'Your competitive spirit creates ripples of inspiration. Join us to compete, grow, and champion excellence across every field.',
          },
        },
        {
          pageId: cwgPage.id,
          type: 'cwg-activities',
          order: 3,
          data: {
            doEyebrow: 'What We Do',
            doHeading: 'Our Core Programs',
            focusEyebrow: 'Focus Areas',
            focusHeading: 'Where We Compete & Excel',
            impactEyebrow: 'Our Impact',
            impactHeading: 'By The Numbers',
            galleryEyebrow: 'Our Activities',
            galleryHeading: "What We've Been Doing",
          },
        },
        {
          pageId: cwgPage.id,
          type: 'cwg-communities',
          order: 4,
          data: {
            heading: 'Explore Our Other Communities',
          },
        },
      ],
    });
  }

  const fsedsPage = await prisma.page.upsert({
    where: { slug: 'fseds' },
    update: {},
    create: { slug: 'fseds', title: 'Foundation for Socio-Economic Development Society' },
  });

  if ((await prisma.section.count({ where: { pageId: fsedsPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: fsedsPage.id,
          type: 'fseds-hero',
          order: 0,
          data: {
            eyebrow: 'Foundation for Socio-Economic Development Society',
            titleLine1: 'Foundation for',
            titleLine2: 'Socio-Economic',
            titleLine3: 'Development Society',
            taglineLine1: 'Building communities through',
            taglineLine2: 'economic empowerment',
            description:
              'We work to create sustainable livelihoods, promote entrepreneurship, and strengthen local economies so communities can thrive with dignity and self-reliance.',
          },
        },
        {
          pageId: fsedsPage.id,
          type: 'fseds-mission',
          order: 1,
          data: {
            eyebrow: 'OUR MISSION',
            headingLine1: 'Empowering People.',
            headingLine2: 'Strengthening Livelihoods.',
            headingLine3: 'Transforming Communities.',
            description:
              'Our mission is to foster inclusive economic growth by providing resources, skills, and opportunities that enable individuals and communities to achieve lasting prosperity.',
          },
        },
        {
          pageId: fsedsPage.id,
          type: 'fseds-cta',
          order: 2,
          data: {
            eyebrow: 'TOGETHER WE RISE',
            headingLine1: 'Empowered communities.',
            headingLine2: 'Stronger economies.',
            headingLine3: 'Brighter futures.',
            description:
              'Your support creates ripples of economic change. Join us in shaping thriving, self-reliant communities.',
          },
        },
        {
          pageId: fsedsPage.id,
          type: 'fseds-activities',
          order: 3,
          data: {
            doEyebrow: 'WHAT WE DO',
            focusEyebrow: 'FOCUS AREAS',
            impactEyebrow: 'OUR IMPACT',
            galleryEyebrow: 'Our Activities',
            galleryHeading: "What We've Been Doing",
          },
        },
        {
          pageId: fsedsPage.id,
          type: 'fseds-communities',
          order: 4,
          data: {
            heading: 'Explore Our Other Communities',
          },
        },
      ],
    });
  }

  const lacPage = await prisma.page.upsert({
    where: { slug: 'lac' },
    update: {},
    create: { slug: 'lac', title: 'Legal Aid Club' },
  });

  if ((await prisma.section.count({ where: { pageId: lacPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: lacPage.id,
          type: 'lac-hero',
          order: 0,
          data: {
            badge: 'A Project Generation Initiative',
            titleLine1: 'LEGAL AID CLUB',
            tagline: 'Justice for all, barriers for none',
            description:
              'We believe everyone has the right to justice. The Legal Aid Club works to break down legal barriers and empower individuals and communities with knowledge, support, and advocacy.',
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-mission',
          order: 1,
          data: {
            eyebrow: 'WHAT WE DO',
            description:
              'The Legal Aid Club provides free legal support, awareness programs, and resources to help individuals navigate their rights and access justice with confidence.',
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-cta',
          order: 2,
          data: {
            heading: 'Be the Voice of Justice',
            description:
              'Join the Legal Aid Club and help us build a world where justice is not a privilege, but a right.',
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-activities',
          order: 3,
          data: {
            galleryEyebrow: 'Our Activities',
            galleryHeading: "What We've Been Doing",
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-communities',
          order: 4,
          data: {
            heading: 'Explore Our Other Communities',
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-camps',
          order: 5,
          data: {
            eyebrow: 'Our Programs',
            heading: 'Legal Awareness Camps',
            tagline: 'Rights · Laws · Constitution',
            description:
              'We bring legal knowledge directly to communities through hands-on programs, making rights accessible to everyone — regardless of background or education.',
            bannerHeading: 'Want us to organize a camp in your area?',
            bannerDescription:
              "Reach out and we'll work with your school, college, or community organization.",
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-impact',
          order: 6,
          data: {
            heading: 'Our Impact',
            description:
              'Through legal knowledge and support, we are creating a fairer, more just society.',
          },
        },
        {
          pageId: lacPage.id,
          type: 'lac-contact',
          order: 7,
          data: {
            heading: 'Need Legal Help?',
            description:
              "We're here to listen and help you take the first step towards your rights.",
            cardCaption: 'Our commitment to every person we serve',
          },
        },
      ],
    });
  }

  const aboutUsPage = await prisma.page.upsert({
    where: { slug: 'about-us' },
    update: {},
    create: { slug: 'about-us', title: 'About Us' },
  });

  if ((await prisma.section.count({ where: { pageId: aboutUsPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: aboutUsPage.id,
          type: 'about-hero',
          order: 0,
          data: {
            eyebrow: 'About Us',
            headingLine1: 'Together, We',
            headingLine2: 'Build a Better',
            headingLine3: 'Tomorrow',
            description:
              "Project Generation is a non-profit students' organisation dedicated to empowering lives and creating opportunities for children, families and communities to thrive.",
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-story',
          order: 1,
          data: {
            eyebrow: 'Our Story',
            heading: 'How It All Began',
            paragraph1:
              'Project Generation was founded with a simple belief — that small acts of kindness can create a big change.',
            paragraph2:
              'What started as a group of passionate students has grown into a movement that touches thousands of lives every year.',
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-mission-vision',
          order: 2,
          data: {
            eyebrow: 'Our Direction',
            heading: 'Mission & Vision',
            missionTitle: 'Our Mission',
            missionText:
              'To uplift underprivileged communities by providing quality education, accessible healthcare, nutritious food, and a safe environment — empowering individuals to realise their full potential and build a better future for themselves and their families.',
            visionTitle: 'Our Vision',
            visionText:
              'A world where every child grows up with equal opportunities — a society free from poverty and inequality, where communities thrive through collective compassion, shared knowledge, and sustainable growth that benefits generations to come.',
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-objectives',
          order: 3,
          data: {
            eyebrow: 'What We Stand For',
            heading: 'Our Objectives',
            description: 'The guiding goals behind every program we run',
            items: JSON.stringify([
              { icon: 'GraduationCap', text: 'Organize educational, awareness, and capacity-building programs for students and communities.' },
              { icon: 'Heart',         text: 'Promote health, legal, environmental, and social awareness through campaigns and outreach.' },
              { icon: 'Trophy',        text: 'Conduct competitions, workshops, seminars, and cultural activities that enhance creativity and critical thinking.' },
              { icon: 'Briefcase',     text: 'Support skill development, career guidance, and life skills training for youth.' },
              { icon: 'Lightbulb',     text: 'Encourage scientific temper, innovation, and Indian Knowledge Systems (IKS) among students.' },
              { icon: 'Users',         text: 'Assist underprivileged and vulnerable sections through social service initiatives.' },
              { icon: 'Handshake',     text: 'Collaborate with educational institutions, NGOs, professionals, and government bodies.' },
              { icon: 'Shield',        text: 'Promote ethical leadership, constitutional values, and civic responsibility.' },
              { icon: 'Star',          text: 'Provide platforms for talent identification, recognition, and youth empowerment.' },
              { icon: 'Leaf',          text: 'Work towards sustainable development goals (SDGs) at the grassroots level.' },
            ]),
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-societies',
          order: 4,
          data: {
            eyebrow: 'How We Operate',
            heading: 'Our Societies & Clubs',
            description:
              "PROJECT 'G' Foundation operates through five dedicated societies and clubs, each with a special focus area to drive meaningful community impact.",
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-values',
          order: 5,
          data: {
            valuesEyebrow: 'Our Values',
            valuesHeading: 'What Guides Us',
            approachEyebrow: 'Our Approach',
            approachHeading: 'How We Work',
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-team',
          order: 6,
          data: {
            heading: 'Meet Our Team',
            boardLabel: 'Board Committee Cum Chairman',
            teamLabel: 'Our Team Members',
          },
        },
      ],
    });
  }

  // Backfill: ensure about-mission-vision section exists for existing databases
  if ((await prisma.section.count({ where: { pageId: aboutUsPage.id, type: 'about-mission-vision' } })) === 0) {
    await prisma.section.create({
      data: {
        pageId: aboutUsPage.id,
        type: 'about-mission-vision',
        order: 2,
        data: {
          eyebrow: 'Our Direction',
          heading: 'Mission & Vision',
          missionTitle: 'Our Mission',
          missionText:
            'To uplift underprivileged communities by providing quality education, accessible healthcare, nutritious food, and a safe environment — empowering individuals to realise their full potential and build a better future for themselves and their families.',
          visionTitle: 'Our Vision',
          visionText:
            'A world where every child grows up with equal opportunities — a society free from poverty and inequality, where communities thrive through collective compassion, shared knowledge, and sustainable growth that benefits generations to come.',
        },
      },
    });
    console.log('Seeded about-mission-vision section');
  }

  // Backfill: add items to about-objectives if missing
  const objSection = await prisma.section.findFirst({
    where: { pageId: aboutUsPage.id, type: 'about-objectives' },
  });
  if (objSection) {
    const existingData = objSection.data as Record<string, string>;
    if (!existingData.items) {
      await prisma.section.update({
        where: { id: objSection.id },
        data: {
          data: {
            ...existingData,
            items: JSON.stringify([
              { icon: 'GraduationCap', text: 'Organize educational, awareness, and capacity-building programs for students and communities.' },
              { icon: 'Heart',         text: 'Promote health, legal, environmental, and social awareness through campaigns and outreach.' },
              { icon: 'Trophy',        text: 'Conduct competitions, workshops, seminars, and cultural activities that enhance creativity and critical thinking.' },
              { icon: 'Briefcase',     text: 'Support skill development, career guidance, and life skills training for youth.' },
              { icon: 'Lightbulb',     text: 'Encourage scientific temper, innovation, and Indian Knowledge Systems (IKS) among students.' },
              { icon: 'Users',         text: 'Assist underprivileged and vulnerable sections through social service initiatives.' },
              { icon: 'Handshake',     text: 'Collaborate with educational institutions, NGOs, professionals, and government bodies.' },
              { icon: 'Shield',        text: 'Promote ethical leadership, constitutional values, and civic responsibility.' },
              { icon: 'Star',          text: 'Provide platforms for talent identification, recognition, and youth empowerment.' },
              { icon: 'Leaf',          text: 'Work towards sustainable development goals (SDGs) at the grassroots level.' },
            ]),
          },
        },
      });
      console.log('Backfilled objectives items');
    }
  }

  const impactPage = await prisma.page.upsert({
    where: { slug: 'impact' },
    update: {},
    create: { slug: 'impact', title: 'Impact' },
  });

  if ((await prisma.section.count({ where: { pageId: impactPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: impactPage.id,
          type: 'impact-hero',
          order: 0,
          data: {
            eyebrow: 'Project Generation',
            headingLine1: 'Measuring Change,',
            headingLine2: 'One Life at a Time',
            description:
              'Every number here represents a real person whose life has been touched. Explore the tangible difference our societies create every single day.',
          },
        },
        {
          pageId: impactPage.id,
          type: 'impact-numbers',
          order: 1,
          data: {
            eyebrow: 'By the Numbers',
            heading: 'Our Impact in Numbers',
            stat0Value: '25,000+', stat0Label: 'Lives Impacted', stat0Sub: 'Across all programs',
            stat1Value: '10,000+', stat1Label: 'Children Educated', stat1Sub: 'Scholarships & school kits',
            stat2Value: '150+', stat2Label: 'Communities Served', stat2Sub: 'Urban, rural & tribal areas',
            stat3Value: '500+', stat3Label: 'Active Volunteers', stat3Sub: 'Giving time every month',
            stat4Value: '50,000+', stat4Label: 'Meals Distributed', stat4Sub: 'Through community kitchens',
            stat5Value: '12+', stat5Label: 'Years of Service', stat5Sub: 'Serving since 2013',
          },
        },
        {
          pageId: impactPage.id,
          type: 'impact-areas',
          order: 2,
          data: {
            eyebrow: 'Focus Areas',
            heading: 'Where We Create Change',
            description: 'Our societies tackle the most pressing challenges communities face, delivering measurable outcomes across six key areas.',
            area0Title: 'Environment', area0Metric: '1,200+ beneficiaries', area0Description: 'Community-led conservation, tree planting, and river clean-ups restore ecosystems and educate youth on sustainable living.',
            area1Title: 'Education', area1Metric: '850+ students supported', area1Description: 'Scholarships, school supplies, and mobile classrooms bring quality education to the most underserved children.',
            area2Title: 'Health & Wellness', area2Metric: '2,300+ patients treated', area2Description: 'Free health camps, vaccination drives, and maternal care programs reduce preventable illness across communities.',
            area3Title: 'Hunger & Food', area3Metric: '640+ families fed', area3Description: 'Community kitchens and food distribution networks deliver nutritious meals and build long-term food security.',
            area4Title: 'Women Empowerment', area4Metric: '520+ women trained', area4Description: 'Vocational training and micro-finance programs equip women with skills and capital to achieve financial independence.',
            area5Title: 'Youth Development', area5Metric: '980+ youth engaged', area5Description: 'Coding bootcamps, leadership workshops, and mentorship programs prepare young people for a competitive world.',
          },
        },
        {
          pageId: impactPage.id,
          type: 'impact-timeline',
          order: 3,
          data: {
            eyebrow: 'Our Journey',
            heading: 'A Decade of Impact',
            milestone0Year: '2013', milestone0Title: 'Project Generation Founded', milestone0Description: 'A small group of students came together with a vision to serve their community through organized, sustained action.',
            milestone1Year: '2015', milestone1Title: 'First 1,000 Lives Impacted', milestone1Description: 'Our early programs in education and health reached the milestone of touching 1,000 lives across local communities.',
            milestone2Year: '2017', milestone2Title: 'Five Societies Launched', milestone2Description: 'Expanded reach by forming five specialized societies, each focusing on a distinct area of community development.',
            milestone3Year: '2019', milestone3Title: '10,000 Children Educated', milestone3Description: 'Our education programs surpassed 10,000 children supported through scholarships, school kits, and mobile learning centers.',
            milestone4Year: '2021', milestone4Title: '500+ Active Volunteers', milestone4Description: 'Our volunteer community grew to over 500 dedicated individuals contributing their time and skills every month.',
            milestone5Year: '2023', milestone5Title: '25,000+ Lives Impacted', milestone5Description: 'Reached the landmark of 25,000 lives touched across 150+ communities — a testament to collective action.',
          },
        },
        {
          pageId: impactPage.id,
          type: 'impact-testimonials',
          order: 4,
          data: {
            eyebrow: 'Real Stories',
            heading: 'Voices of Change',
            testimonial0Quote: "The scholarship I received from Project Generation changed everything. I was the first in my family to finish school. Now I want to give back the same way.",
            testimonial0Name: 'Anita Sharma', testimonial0Location: 'Rural District, UP', testimonial0Category: 'Education', testimonial0Initials: 'AS',
            testimonial1Quote: "The free health camp caught my husband's illness early. Without Project Generation, we would never have afforded the tests. We are forever grateful.",
            testimonial1Name: 'Rekha Devi', testimonial1Location: 'Urban Slum, Bihar', testimonial1Category: 'Health', testimonial1Initials: 'RD',
            testimonial2Quote: "Their vocational training gave me the skills to start my own tailoring shop. Today I employ three other women from my village. That is real change.",
            testimonial2Name: 'Sunita Kumari', testimonial2Location: 'Semi-Urban, Rajasthan', testimonial2Category: 'Empowerment', testimonial2Initials: 'SK',
          },
        },
        {
          pageId: impactPage.id,
          type: 'impact-cta',
          order: 5,
          data: {
            eyebrow: 'Be Part of the Change',
            heading: 'Your Support Makes This Possible',
            description:
              "Every contribution — whether time, skills, or a donation — adds to the numbers you've seen here. Join us in writing the next chapter of this story.",
          },
        },
      ],
    });
  }

  const giPage = await prisma.page.upsert({
    where: { slug: 'get-involved' },
    update: {},
    create: { slug: 'get-involved', title: 'Get Involved' },
  });

  if ((await prisma.section.count({ where: { pageId: giPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: giPage.id,
          type: 'gi-hero',
          order: 0,
          data: {
            eyebrow: 'Project Generation',
            headingLine1: 'Get Involved &',
            headingLine2: 'Make a Difference',
            description:
              'Whether you volunteer your time, donate, or simply spread the word — every action counts. Join us in empowering communities and transforming lives.',
          },
        },
        {
          pageId: giPage.id,
          type: 'gi-ways',
          order: 1,
          data: {
            eyebrow: 'How You Can Help',
            heading: 'Ways to Make a Difference',
            description:
              'There are many ways to support our mission. Choose the path that fits you best and start creating real change today.',
          },
        },
        {
          pageId: giPage.id,
          type: 'gi-volunteer',
          order: 2,
          data: {
            eyebrow: 'Volunteer',
            headingLine1: 'Be The Change',
            headingLine2: 'You Wish to See',
            description:
              'Volunteering with Project Generation means becoming part of a movement that puts people first. No experience needed — just a heart ready to serve.',
          },
        },
        {
          pageId: giPage.id,
          type: 'gi-donate',
          order: 3,
          data: {
            eyebrow: 'Donate',
            headingLine1: 'Your Generosity',
            headingLine2: 'Transforms Lives',
            description:
              'Every contribution — big or small — goes towards education, health, and welfare programs that uplift the most vulnerable in our communities. Your gift creates real, lasting change.',
          },
        },
        {
          pageId: giPage.id,
          type: 'gi-spread',
          order: 4,
          data: {
            eyebrow: 'Spread the Word',
            heading: 'Amplify Our Impact',
            description:
              "You don't need money or a lot of time. A share, a conversation, or a simple message can bring more people into our mission.",
          },
        },
      ],
    });
  }

  const contactPage = await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {},
    create: { slug: 'contact', title: 'Contact' },
  });

  if ((await prisma.section.count({ where: { pageId: contactPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: contactPage.id,
          type: 'contact-hero',
          order: 0,
          data: {
            eyebrow: 'Contact Us',
            headingLine1: "We'd Love to",
            headingLine2: 'Hear From',
            headingLine3: 'You',
            description:
              'Have a question, want to collaborate, or just want to say hello? Reach out to us and our team will get back to you as soon as possible.',
          },
        },
        {
          pageId: contactPage.id,
          type: 'contact-form',
          order: 1,
          data: {
            eyebrow: 'Send a Message',
            heading: "Let's Start a Conversation",
            description: "Fill in the form below and we'll get back to you shortly.",
          },
        },
      ],
    });
  }

  const causesPage = await prisma.page.upsert({
    where: { slug: 'causes' },
    update: {},
    create: { slug: 'causes', title: 'Causes' },
  });

  if ((await prisma.section.count({ where: { pageId: causesPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: causesPage.id,
          type: 'causes-hero',
          order: 0,
          data: {
            eyebrow: 'Active Campaigns',
            heading: 'Causes That Need Your Support',
            description:
              'Every rupee you give goes directly to one of these causes. Browse our active campaigns and choose the change you want to be part of.',
          },
        },
      ],
    });
  }

  const donatePage = await prisma.page.upsert({
    where: { slug: 'donate' },
    update: {},
    create: { slug: 'donate', title: 'Donate' },
  });

  if ((await prisma.section.count({ where: { pageId: donatePage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: donatePage.id,
          type: 'donate-hero',
          order: 0,
          data: {
            badge: 'Make a Difference Today',
            headingLine1: 'Your Generosity',
            headingLine2: 'Changes Lives',
            description:
              'Every rupee you give goes directly towards education, healthcare, and community development programs that uplift the most vulnerable.',
          },
        },
        {
          pageId: donatePage.id,
          type: 'donate-impact',
          order: 1,
          data: {
            eyebrow: 'Your Impact',
            heading: 'What Your Donation Achieves',
          },
        },
        {
          pageId: donatePage.id,
          type: 'donate-form',
          order: 2,
          data: {
            eyebrow: 'Donate',
            heading: 'Choose Your Contribution',
            description: 'Select an amount below or enter a custom value. Every rupee counts.',
          },
        },
        {
          pageId: donatePage.id,
          type: 'donate-faq',
          order: 3,
          data: {
            eyebrow: 'Questions',
            heading: 'Frequently Asked Questions',
          },
        },
      ],
    });
  }

  const storiesPage = await prisma.page.upsert({
    where: { slug: 'stories' },
    update: {},
    create: { slug: 'stories', title: 'Stories' },
  });

  if ((await prisma.section.count({ where: { pageId: storiesPage.id } })) === 0) {
    await prisma.section.createMany({
      data: [
        {
          pageId: storiesPage.id,
          type: 'stories-hero',
          order: 0,
          data: {
            eyebrow: 'Stories of Change',
            heading: 'Real People. Real Impact.',
            description:
              'Every number in our impact report represents a person with a name, a story, and a future. Here are just a few of the lives that have been changed through your support.',
          },
        },
      ],
    });
  }

  if ((await prisma.teamMember.count()) === 0) {
    await prisma.teamMember.createMany({
      data: [
        { name: 'Anita Verma', role: 'Founder & Director', color: '#4a90d9', order: 0 },
        { name: 'Rahul Mehta', role: 'Programs Manager', color: '#2ecc71', order: 1 },
        { name: 'Sneha Kapoor', role: 'Education Lead', color: '#e74c3c', order: 2 },
        { name: 'Vikram Singh', role: 'Community Outreach', color: '#9b59b6', order: 3 },
        { name: 'Priya Nair', role: 'Volunteer Coordinator', color: '#f39c12', order: 4 },
        { name: 'Arjun Das', role: 'Finance & Operations', color: '#1a3270', order: 5 },
        { name: 'Kavitha Rao', role: 'Legal Advisor', color: '#0891b2', order: 6 },
        { name: 'Deepak Joshi', role: 'Field Coordinator', color: '#059669', order: 7 },
        { name: 'Nisha Thomas', role: 'Communications Head', color: '#7c3aed', order: 8 },
        { name: 'Sanjay Gupta', role: 'Research Analyst', color: '#d97706', order: 9 },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
