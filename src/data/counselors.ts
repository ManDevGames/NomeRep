import type { Counselor } from '@/types'

// Demo profile for prototype purposes only — name, credentials and
// reviews are illustrative and not a real professional listing.
export const counselors: Counselor[] = [
  {
    id: 'shalinee-sen',
    name: 'Shalinee Sen',
    credentials: 'M.A. Counseling Psychology (Demo Profile)',
    specializations: ['Relationship patterns', 'Communication', 'Boundaries'],
    experienceYears: 9,
    languages: ['English', 'Hindi', 'Bengali'],
    sessionFormats: ['Video', 'Audio', 'Chat'],
    rating: 4.9,
    reviewCount: 356,
    pricePerSessionInr: 1499,
    bio: 'Helps clients understand the relationship patterns they keep repeating and build healthier, more secure ways of connecting.',
    avatarHue: 'blush',
  },
]

export const getCounselorById = (id: string): Counselor | undefined =>
  counselors.find((counselor) => counselor.id === id)
