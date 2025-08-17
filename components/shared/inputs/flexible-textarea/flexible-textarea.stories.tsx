import { Meta, StoryObj } from "@storybook/nextjs-vite";
import FlexibleTextarea from ".";

const meta = {
  title: "flexible-textarea",
  component: FlexibleTextarea,
  tags: ["autodocs"],
  argTypes: {
    initialRows: {
      control: { type: "number", min: 1, max: 10 },
      description: "초기 행 수",
    },
    maxRows: {
      control: { type: "number", min: 1, max: 20 },
      description: "최대 행 수 (스크롤 표시 기준)",
    },
    hasButton: {
      control: "boolean",
      description: "버튼 포함 여부 (패딩 조정)",
    },
    submitOnModEnter: {
      control: "boolean",
      description: "Cmd/Ctrl + Enter로 제출 기능",
    },
    placeholder: {
      control: "text",
      description: "placeholder 텍스트",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
  args: {
    onInput: () => {},
    onKeyDown: () => {},
    onChange: () => {},
  },
} satisfies Meta<typeof FlexibleTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    initialRows: 1,
    hasButton: false,
    submitOnModEnter: true,
    placeholder: "메시지를 입력하세요...",
    maxRows: 5,
  },
};

// 다중 행 초기 설정
export const MultipleInitialRows: Story = {
  args: {
    initialRows: 3,
    hasButton: false,
    submitOnModEnter: true,
    placeholder: "여러 줄 텍스트를 입력하세요...",
    maxRows: 8,
  },
};

// 최대 행 제한 없음
export const NoMaxRows: Story = {
  args: {
    initialRows: 1,
    hasButton: false,
    submitOnModEnter: true,
    placeholder: "무제한 확장 가능한 텍스트 영역...",
    maxRows: undefined,
  },
};

// 버튼과 함께 사용
export const WithButton: Story = {
  args: {
    initialRows: 1,
    hasButton: true,
    submitOnModEnter: true,
    placeholder: "버튼이 있는 텍스트 영역...",
    maxRows: 4,
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-violet-600 text-white rounded text-sm hover:bg-violet-700"
        >
          전송
        </button>
      </div>
    ),
  ],
};

// 폼 내에서 사용
export const InForm: Story = {
  args: {
    initialRows: 2,
    hasButton: false,
    submitOnModEnter: true,
    placeholder: "Cmd/Ctrl + Enter로 제출하거나 버튼을 클릭하세요...",
    maxRows: 6,
    name: "message",
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          alert(`제출된 내용: ${formData.get("message")}`);
          e.currentTarget.reset();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            메시지
          </label>
          <Story />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            제출
          </button>
          <button
            type="reset"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            초기화
          </button>
        </div>
      </form>
    ),
  ],
};

// 제출 기능 비활성화
export const NoSubmitOnEnter: Story = {
  args: {
    initialRows: 1,
    hasButton: false,
    submitOnModEnter: false,
    placeholder: "Enter로 줄바꿈만 가능...",
    maxRows: 5,
  },
};

// 긴 텍스트 미리 입력
export const WithLongText: Story = {
  args: {
    initialRows: 1,
    hasButton: false,
    submitOnModEnter: true,
    maxRows: 4,
    defaultValue: `이것은 긴 텍스트 예시입니다.
여러 줄에 걸쳐 작성된 내용으로
textarea가 자동으로 높이를 조절하는
기능을 테스트할 수 있습니다.
이 텍스트는 maxRows 제한에 의해
스크롤이 나타날 수 있습니다.`,
  },
};
