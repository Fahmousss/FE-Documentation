// src/shared/new-button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  Calendar,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
} from 'lucide-react';
import Button from './Button';

/**
 * # New Button Component
 *
 * Button component hasil exploration dengan fokus pada **UI yang ciamik dan clean**.
 *
 * ## Key Features
 *
 * - ✨ **13 Beautiful Gradient Variants** - dari default sampai cyan
 * - 🎨 **Smooth Hover & Focus States** - with subtle shadow transitions
 * - 🔄 **Built-in Loading State** - dengan spinner animation
 * - 🎯 **Flexible Icon System** - support semua Lucide icons
 * - 📏 **Responsive Typography** - dari mobile sampai 2xl screens
 * - ♿ **Accessibility Ready** - proper focus rings & disabled states
 * - 🎭 **Custom Height Support** - untuk edge cases
 *
 * ## Design Philosophy
 *
 * Button ini dibuat dengan perhatian pada detail:
 * - Gradient backgrounds untuk depth
 * - Inset shadows untuk tactile feel
 * - Border yang subtle tapi visible
 * - Smooth transitions untuk premium feel
 *
 * ## When to Use
 *
 * - ✅ Primary actions (Create, Save, Submit)
 * - ✅ Colorful actions yang perlu highlight
 * - ✅ Modern UI dengan gradient aesthetic
 * - ✅ Buttons yang need prominent presence
 *
 * ## Migration from ButtonEID
 *
 * ```tsx
 * // Old ButtonEID
 * <ButtonEID variant="primary">Save</ButtonEID>
 *
 * // New Button (drop-in replacement)
 * <Button variant="primary">Save</Button>
 *
 * // With icon (simplified)
 * <Button variant="primary" icon={Save}>Save Changes</Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modern button component dengan beautiful gradients, smooth animations, dan comprehensive feature set.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'green',
        'blue',
        'purple',
        'violet',
        'orange',
        'red',
        'yellow',
        'pink',
        'indigo',
        'teal',
        'cyan',
      ],
      description: 'Visual style variant dengan gradient backgrounds',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'custom'],
      description: 'Predefined button sizes',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'sm' },
      },
    },
    height: {
      control: 'text',
      description: 'Custom height class (e.g., "h-[34px]")',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    showDefaultIcon: {
      control: 'boolean',
      description: 'Show Plus icon by default',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    loadingText: {
      control: 'text',
      description: 'Text to show when loading',
    },
    iconSize: {
      control: 'number',
      description: 'Icon size in pixels',
      table: {
        defaultValue: { summary: '18.5' },
      },
    },
    iconStrokeWidth: {
      control: 'number',
      description: 'Icon stroke width',
      table: {
        defaultValue: { summary: '2' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ==========================================
// VARIANT SHOWCASE
// ==========================================

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Neutral</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Primary Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="blue">Blue</Button>
          <Button variant="indigo">Indigo</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Success & Nature</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="green">Green</Button>
          <Button variant="teal">Teal</Button>
          <Button variant="cyan">Cyan</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Vibrant</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="purple">Purple</Button>
          <Button variant="violet">Violet</Button>
          <Button variant="pink">Pink</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Attention & Warning</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="orange">Orange</Button>
          <Button variant="yellow">Yellow</Button>
          <Button variant="red">Red</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semua variant yang tersedia dengan beautiful gradient backgrounds.',
      },
    },
  },
};

// ==========================================
// SIZE VARIANTS
// ==========================================

export const Sizes: Story = {
  args: {
    label: 'sada',
    isLoading: false,
  },

  render: () => (
    <div className="flex items-end gap-4">
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story: 'Tiga ukuran predefined: small (36px), medium (36px), dan large (44px).',
      },
    },
  },
};

export const CustomHeight: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button variant="primary" height="h-[32px]">
        32px Custom
      </Button>
      <Button variant="primary" height="h-[40px]">
        40px Custom
      </Button>
      <Button variant="primary" height="h-[48px]">
        48px Custom
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom height untuk edge cases menggunakan Tailwind arbitrary values.',
      },
    },
  },
};

// ==========================================
// WITH ICONS
// ==========================================

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" icon={Save}>
          Save Changes
        </Button>
        <Button variant="green" icon={Download}>
          Download
        </Button>
        <Button variant="orange" icon={Upload}>
          Upload File
        </Button>
        <Button variant="red" icon={Trash2}>
          Delete
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="blue" icon={Edit}>
          Edit Profile
        </Button>
        <Button variant="purple" icon={Eye}>
          View Details
        </Button>
        <Button variant="teal" icon={Search}>
          Search
        </Button>
        <Button variant="violet" icon={Settings}>
          Settings
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons dengan Lucide icons. Icon automatically positioned di sebelah text.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" showDefaultIcon={false} className="w-10 h-10 p-0">
        <Save size={18} />
      </Button>
      <Button variant="green" showDefaultIcon={false} className="w-10 h-10 p-0">
        <Download size={18} />
      </Button>
      <Button variant="red" showDefaultIcon={false} className="w-10 h-10 p-0">
        <Trash2 size={18} />
      </Button>
      <Button variant="blue" showDefaultIcon={false} className="w-10 h-10 p-0">
        <Edit size={18} />
      </Button>
      <Button variant="purple" showDefaultIcon={false} className="w-10 h-10 p-0">
        <Eye size={18} />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons untuk compact UI. Set `showDefaultIcon={false}` dan custom size.',
      },
    },
  },
};

export const CustomIconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" icon={Save} iconSize={14} iconStrokeWidth={2}>
        Small Icon
      </Button>
      <Button variant="primary" icon={Save} iconSize={18.5} iconStrokeWidth={2}>
        Default Icon
      </Button>
      <Button variant="primary" icon={Save} iconSize={24} iconStrokeWidth={2.5}>
        Large Icon
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize icon size dan stroke width untuk different aesthetic.',
      },
    },
  },
};

// ==========================================
// LOADING STATES
// ==========================================

export const Loading: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" isLoading>
          Saving...
        </Button>
        <Button variant="green" isLoading loadingText="Uploading...">
          Upload
        </Button>
        <Button variant="red" isLoading loadingText="Deleting...">
          Delete
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" icon={Save} isLoading>
          Save
        </Button>
        <Button variant="green" icon={Download} isLoading showIconOnLoading>
          Download
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loading states dengan spinner animation. Use `loadingText` untuk custom text, `showIconOnLoading` untuk show faded icon.',
      },
    },
  },
};

// ==========================================
// DISABLED STATES
// ==========================================

export const Disabled: Story = {
  args: {
    showDefaultIcon: true,
  },

  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default" disabled>
        Default Disabled
      </Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="green" disabled>
        Green Disabled
      </Button>
      <Button variant="red" disabled>
        Red Disabled
      </Button>
      <Button variant="purple" disabled>
        Purple Disabled
      </Button>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story: 'Disabled states dengan lighter colors dan no-cursor-pointer.',
      },
    },
  },
};

// ==========================================
// REAL-WORLD EXAMPLES
// ==========================================

export const FormActions: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4 p-6 bg-white rounded-lg border">
      <h3 className="text-lg font-semibold">Create New User</h3>
      <div className="space-y-3">
        <input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant="default">Cancel</Button>
        <Button variant="primary" icon={Save}>
          Save User
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typical form actions dengan cancel dan save buttons.',
      },
    },
  },
};

export const TableActions: Story = {
  render: () => (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="px-4 py-3 text-sm">John Doe</td>
            <td className="px-4 py-3 text-sm">john@example.com</td>
            <td className="px-4 py-3 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex gap-2 justify-end">
                <Button variant="blue" showDefaultIcon={false} className="w-8 h-8 p-0">
                  <Eye size={16} />
                </Button>
                <Button variant="purple" showDefaultIcon={false} className="w-8 h-8 p-0">
                  <Edit size={16} />
                </Button>
                <Button variant="red" showDefaultIcon={false} className="w-8 h-8 p-0">
                  <Trash2 size={16} />
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm">Jane Smith</td>
            <td className="px-4 py-3 text-sm">jane@example.com</td>
            <td className="px-4 py-3 text-sm">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Inactive</span>
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex gap-2 justify-end">
                <Button variant="blue" showDefaultIcon={false} className="w-8 h-8 p-0">
                  <Eye size={16} />
                </Button>
                <Button variant="purple" showDefaultIcon={false} className="w-8 h-8 p-0" disabled>
                  <Edit size={16} />
                </Button>
                <Button variant="red" showDefaultIcon={false} className="w-8 h-8 p-0" disabled>
                  <Trash2 size={16} />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table dengan action buttons dalam compact form.',
      },
    },
  },
};

export const ToolbarActions: Story = {
  render: () => (
    <div className="w-full p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <Button variant="primary" icon={Plus} label="Add New" />
          <Button variant="default" icon={Filter} label="Filter" />
          <Button variant="default" icon={RefreshCw} label="Refresh" />
        </div>
        <div className="flex gap-2">
          <Button variant="green" icon={Download} label="Export" />
          <Button variant="orange" icon={Upload} label="Import" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar dengan berbagai action buttons untuk data management.',
      },
    },
  },
};

export const ContactButtons: Story = {
  render: () => (
    <div className="space-y-3 p-6 bg-white rounded-lg border max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Contact Me</h3>
      <Button variant="blue" icon={Mail} className="w-full justify-start">
        Send Email
      </Button>
      <Button variant="green" icon={Phone} className="w-full justify-start">
        Call Now
      </Button>
      <Button variant="purple" icon={Calendar} className="w-full justify-start">
        Schedule Meeting
      </Button>
      <Button variant="orange" icon={FileText} className="w-full justify-start">
        View Resume
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-width buttons dengan left-aligned content untuk contact actions.',
      },
    },
  },
};

// ==========================================
// INTERACTIVE PLAYGROUND
// ==========================================

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Click Me',
    isLoading: false,
    disabled: false,
    showDefaultIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground untuk explore semua props dan combinations.',
      },
    },
  },
};

export const ShowIcon: Story = {
  args: {
    showDefaultIcon: false,
  },

  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" icon={Save} iconSize={14} iconStrokeWidth={2}>
        Small Icon
      </Button>
      <Button variant="primary" icon={Save} iconSize={18.5} iconStrokeWidth={2}>
        Default Icon
      </Button>
      <Button variant="primary" icon={Save} iconSize={24} iconStrokeWidth={2.5}>
        Large Icon
      </Button>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story: 'Customize icon size dan stroke width untuk different aesthetic.',
      },
    },
  },
};
