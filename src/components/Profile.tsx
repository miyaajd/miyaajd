type Item = {
  period: string;
  title: string;
  subtitle?: string;
  school?: string;
  company?: string;
  role?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export default function Profile({ title, items }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">{title}</h2>

      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[120px_1fr] gap-6">
            
            {/* 기간 */}
            <div className="text-sm text-neutral-500">
              {item.period}
            </div>

            {/* 내용 */}
            <div>
              <div className="font-semibold">{item.title}</div>

              {item.subtitle && (
                <div className="text-sm text-neutral-600">
                  {item.subtitle}
                </div>
              )}

              {item.school && (
                <div className="text-sm text-neutral-400">
                  {item.school}
                </div>
              )}

              {item.company && (
                <div className="text-sm text-neutral-600">
                  {item.company}
                </div>
              )}

              {item.role && (
                <div className="text-sm text-neutral-400">
                  {item.role}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}