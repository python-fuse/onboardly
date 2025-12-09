import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/dashboard", },
  { name: "Tours", href: "/dashboard/edittour",  },
  { name: "Steps", href: "dashboard/managetour",  },
  { name: "Analytics", href: "#",  },
  { name: "Settings", href: "#",  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200/10 bg-[#161023] p-4 text-white">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-3 px-2 mb-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5ngYh5buKcZfMu9Bzquhr31XfWBK1shORf072WvRE_OiL_ntHbkmgMoFvN3rHU6nrKcf8swEauwPF77oMKCao00Jc8SH6lcqb9GV0XZqNmIsoYno2ruokeUNK0UtsVJQKyQOpbqVn4WgeZfo8KW5TVKC0KYy0lYg1MtCfOgNBMs9tLUGogYiEonRrbOzL2r5_a_FSK2ATw1Y-_Dk8NvKtuBwAWlRxPLhDYk969Z7LNmVEsaA7wH5KzQWFqp-NXFz-YsnAJqgtDBY")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">
                Guidely Inc.
              </h1>
              <p className="text-[#a490cb] text-sm font-normal leading-normal">
                Workspace
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-[#2f2249]/60 transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <button className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            New Tour
          </button>
        </div>
      </div>
    </aside>
  );
}
