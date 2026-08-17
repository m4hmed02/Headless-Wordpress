import { AddressCard } from "./ProfileHelpers";

export default function ProfileAddressesTab({ profile }) {
  const billing  = profile?.data?.billing  || profile?.billing  || null;
  const shipping = profile?.data?.shipping || profile?.shipping || null;

  const formatAddress = (addr) => {
    if (!addr) return null;
    return [
      addr.address_1,
      addr.address_2,
      addr.city && addr.state
        ? `${addr.city}, ${addr.state}`
        : addr.city || addr.state,
      addr.postcode,
      addr.country,
    ].filter(Boolean);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Addresses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AddressCard title="Billing Address"  lines={formatAddress(billing)}  />
        <AddressCard title="Shipping Address" lines={formatAddress(shipping)} />
      </div>
    </div>
  );
}
