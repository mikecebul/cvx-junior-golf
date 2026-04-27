import Image from 'next/image'
import {
  Menu,
  X,
  ArrowRight,
  Glasses,
  FlaskConical,
  Users,
  Tally4,
  WineOff,
  Car,
  Phone,
  Navigation,
  Printer,
  Mail,
  Pencil,
  SprayCan,
  Brain,
  CircleOff,
  CheckCircle,
  UserPlus,
  User,
  UserX,
  Check,
  ChevronsUpDown,
  LucideIcon,
  PlusCircle,
  Baby,
  PersonStanding,
  Clock,
  GraduationCap,
  Trophy,
  LandPlot,
  Handshake,
  LucideProps,
} from 'lucide-react'
import { forwardRef, ReactNode } from 'react'
import { cn } from '@/utilities/cn'

export const Facebook = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, strokeWidth: _strokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      {...props}
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  ),
) as LucideIcon

Facebook.displayName = 'Facebook'

export const Icons = {
  logo: ({ className }: { className: string }) => (
    <Image
      src="/bases-logo.png"
      width={1024}
      height={252}
      className={className}
      alt="BASES Logo"
      priority
    />
  ),
  carf: ({ className }: { className: string }) => (
    <Image
      src="/CARF_GoldSeal.png"
      width={500}
      height={500}
      className={className}
      alt="CARF Certification"
    />
  ),
  openMenu: Menu,
  closeMenu: X,
  arrowRight: ArrowRight,
  glasses: Glasses,
  flask: FlaskConical,
  group: Users,
  jail: Tally4,
  class: WineOff,
  car: Car,
  phone: Phone,
  navigation: Navigation,
  print: Printer,
  mail: Mail,
  pencil: Pencil,
  spray: SprayCan,
  brain: Brain,
  zero: CircleOff,
  facebook: Facebook,
  checkCirlce: CheckCircle,
  adduser: UserPlus,
  user: User,
  delete: UserX,
  check: Check,
  chevronsUpDown: ChevronsUpDown,
  plusCircle: PlusCircle,
  baby: Baby,
  kid: PersonStanding,
  clock: Clock,
  graduationCap: GraduationCap,
  handshake: Handshake,
  trophy: Trophy,
}

export type LucideIconsType = (typeof lucideIcons)[number]

export const lucideIcons = [
  { component: UserPlus, label: 'Add User', value: 'UserPlus' },
  { component: ArrowRight, label: 'Arrow Right', value: 'ArrowRight' },
  { component: Brain, label: 'Brain', value: 'Brain' },
  { component: Car, label: 'Car', value: 'Car' },
  { component: CheckCircle, label: 'Check Circle', value: 'CheckCircle' },
  { component: Check, label: 'Check', value: 'Check' },
  { component: X, label: 'Close', value: 'X' },
  { component: UserX, label: 'Delete User', value: 'UserX' },
  { component: Facebook, label: 'Facebook', value: 'Facebook' },
  { component: FlaskConical, label: 'Flask', value: 'FlaskConical' },
  { component: LandPlot, label: 'Golf', value: 'LandPlot' },
  { component: Glasses, label: 'Glasses', value: 'Glasses' },
  { component: GraduationCap, label: 'Graduation Cap', value: 'GraduationCap' },
  { component: Users, label: 'Group', value: 'Users' },
  { component: Handshake, label: 'Handshake', value: 'Handshake' },
  { component: Tally4, label: 'Jail', value: 'Tally4' },
  { component: Mail, label: 'Mail', value: 'Mail' },
  { component: Menu, label: 'Menu', value: 'Menu' },
  { component: Navigation, label: 'Navigation', value: 'Navigation' },
  { component: Pencil, label: 'Pencil', value: 'Pencil' },
  { component: Phone, label: 'Phone', value: 'Phone' },
  { component: PlusCircle, label: 'Plus Circle', value: 'PlusCircle' },
  { component: Printer, label: 'Printer', value: 'Printer' },
  { component: SprayCan, label: 'Spray Can', value: 'SprayCan' },
  { component: Trophy, label: 'Trophy', value: 'Trophy' },
  { component: ChevronsUpDown, label: 'Up Down', value: 'ChevronsUpDown' },
  { component: User, label: 'User', value: 'User' },
  { component: WineOff, label: 'Wine Off', value: 'WineOff' },
  { component: CircleOff, label: 'Zero', value: 'CircleOff' },
]

export const iconMapping = lucideIcons.reduce<Record<string, LucideIcon>>((acc, icon) => {
  acc[icon.value] = icon.component
  return acc
}, {})

export const renderIcon = (iconValue: string, small?: 'small', component?: string): ReactNode => {
  const IconComponent = component ?? iconMapping[iconValue]
  const iconSize = small ? 'w-4 h-4' : 'w-6 h-6' // Adjust the icon size
  const containerSize = small ? 'w-6 h-6' : 'w-10 h-10' // Adjust the container size

  if (!IconComponent) {
    return (
      <div className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}>
        <User className={`${iconSize} text-white`} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${containerSize} rounded-lg bg-brand`}>
      <IconComponent className={`${iconSize} text-white`} aria-hidden="true" />
    </div>
  )
}

export const lucideIconArray = [
  Menu,
  X,
  ArrowRight,
  Glasses,
  FlaskConical,
  Users,
  Tally4,
  WineOff,
  Car,
  Phone,
  Navigation,
  Printer,
  Mail,
  Pencil,
  SprayCan,
  Brain,
  CircleOff,
  Facebook,
  CheckCircle,
  UserPlus,
  User,
  UserX,
  Check,
  ChevronsUpDown,
  PlusCircle,
  Baby,
  PersonStanding,
  Clock,
  GraduationCap,
  Handshake,
  Trophy,
]
export type LuicideIconArray = typeof lucideIconArray
