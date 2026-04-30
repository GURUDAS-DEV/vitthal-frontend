"use client";

import Image from "next/image";
import {
  Building2,
  Users,
  Globe,
  Award,
  Target,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const milestones = [
  { year: "2021", title: "Founded", desc: "MTWO Groups was established with a vision to transform B2B procurement in India" },
  { year: "2022", title: "1,000+ Vendors", desc: "Reached milestone of 1,000 verified vendors on platform" },
  { year: "2023", title: "Pan-India Presence", desc: "Expanded operations to 100+ cities across India" },
  { year: "2024", title: "Industry Leader", desc: "Became one of India's top 5 B2B industrial marketplaces" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    desc: "We verify every vendor and ensure transparent pricing with no hidden charges",
  },
  {
    icon: Target,
    title: "Customer First",
    desc: "Every decision we make starts with understanding buyer and vendor needs",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "We help businesses scale by connecting them with quality partners",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnerships",
    desc: "Building lasting relationships between buyers and suppliers is our priority",
  },
];

const stats = [
  { value: "2,300+", label: "Verified Vendors", icon: Building2 },
  { value: "15,000+", label: "Active Buyers", icon: Users },
  { value: "180+", label: "Cities Covered", icon: MapPin },
  { value: "50,000+", label: "Orders/Month", icon: Globe },
];

const team = [
  { name: "Rahul Sharma", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { name: "Priya Patel", role: "COO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  { name: "Amit Kumar", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { name: "Neha Gupta", role: "Head of Vendor Success", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Hero Section */}
      <section className="relative bg-zinc-50 border-b border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1d4ed8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />
                About MTWO Groups
              </span>
              <h1 className="font-heading mt-5 text-4xl font-bold leading-[1.2] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem]">
                Building India&apos;s Most Trusted <span className="text-[#1d4ed8]">B2B Marketplace</span>
              </h1>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-zinc-600 sm:text-lg">
                We&apos;re on a mission to simplify industrial procurement by connecting verified vendors with quality buyers through technology and trust.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="h-12 whitespace-nowrap rounded-lg bg-[#1d4ed8] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af]">
                  Join as Vendor
                </button>
                <button className="h-12 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-7 text-sm font-medium text-zinc-700 transition-colors hover:border-[#1d4ed8] hover:text-[#1d4ed8]">
                  Browse Products
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="MTWO Groups office and team"
                  width={800}
                  height={600}
                  className="h-80 w-full object-cover lg:h-96"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[#1d4ed8]">
                  <stat.icon size={24} strokeWidth={1.75} />
                </div>
                <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="bg-zinc-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">Our Journey</h2>
            <p className="mt-3 text-base text-zinc-600 max-w-2xl mx-auto">
              From a small startup to India&apos;s leading B2B marketplace
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute -top-3 left-6 rounded-full bg-[#1d4ed8] px-3 py-1 text-xs font-semibold text-white">
                  {milestone.year}
                </div>
                <h3 className="font-heading mt-3 text-lg font-semibold text-zinc-900">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">Our Values</h2>
            <p className="mt-3 text-base text-zinc-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[#1d4ed8]/30 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-[#1d4ed8]">
                  <value.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-base font-semibold text-zinc-900">{value.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl">Our Leadership</h2>
            <p className="mt-3 text-base text-zinc-600 max-w-2xl mx-auto">
              Meet the team building the future of B2B commerce
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-semibold text-zinc-900">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#1d4ed8]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Recognition */}
      <section className="bg-white border-t border-zinc-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-heading text-2xl font-bold text-zinc-900 sm:text-3xl">
                  Trusted by Industry Leaders
                </h2>
                <p className="mt-3 text-base text-zinc-600">
                  MTWO Groups is recognized by top industry bodies and has received multiple awards for innovation in B2B commerce.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["ISO 27001 Certified", "Startup India Recognized", "MSME Partner", "Export Excellence Award"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 rounded-lg bg-white p-3 border border-zinc-200">
                    <Award size={20} className="text-[#1d4ed8]" strokeWidth={1.75} />
                    <span className="text-sm font-medium text-zinc-700">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1d4ed8]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">
              Ready to grow with us?
            </h3>
            <p className="mt-2 max-w-lg text-sm text-blue-100">
              Join thousands of businesses already using MTWO Groups for their procurement needs.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <button className="whitespace-nowrap rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1d4ed8] transition-colors hover:bg-blue-50">
              Get Started
            </button>
            <button className="whitespace-nowrap rounded-lg border border-white/40 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}