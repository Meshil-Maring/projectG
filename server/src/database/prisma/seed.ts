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
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
          quote: 'Thanks to the scholarship, I am now able to study and dream of a better future.',
          name: 'Aarav Kumar',
          role: 'Scholarship Recipient',
          order: 0,
        },
        {
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80',
          quote: 'The support we received helped us rebuild our home and live with dignity again.',
          name: 'Sunita Devi',
          role: 'Community Beneficiary',
          order: 1,
        },
        {
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
          quote: 'Volunteering here has been the most meaningful experience of my life.',
          name: 'Rohan Mehta',
          role: 'Volunteer',
          order: 2,
        },
        {
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
          quote: "Every contribution transformed not just my child's future but our entire community.",
          name: 'Priya Sharma',
          role: 'Parent Beneficiary',
          order: 3,
        },
        {
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80',
          quote: 'I never imagined clean water would change everything — it truly gave us a new life.',
          name: 'Meera Nair',
          role: 'Village Resident',
          order: 4,
        },
        {
          image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&q=80',
          quote: 'The skills training I received opened doors I never knew existed.',
          name: 'Samuel Osei',
          role: 'Vocational Graduate',
          order: 5,
        },
        {
          image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&q=80',
          quote: 'Seeing my students read their first sentence was worth more than words can express.',
          name: 'Fatima Al-Hassan',
          role: 'Community Teacher',
          order: 6,
        },
        {
          image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80',
          quote: 'From receiving help to leading others — that journey is something I cherish forever.',
          name: 'Diego Reyes',
          role: 'Farmer & Community Trainer',
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
          type: 'about-objectives',
          order: 2,
          data: {
            eyebrow: 'What We Stand For',
            heading: 'Our Objectives',
            description: 'The guiding goals behind every program we run',
          },
        },
        {
          pageId: aboutUsPage.id,
          type: 'about-societies',
          order: 3,
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
          order: 4,
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
          order: 5,
          data: {
            heading: 'Meet Our Team',
            boardLabel: 'Board Committee Cum Chairman',
            teamLabel: 'Our Team Members',
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
