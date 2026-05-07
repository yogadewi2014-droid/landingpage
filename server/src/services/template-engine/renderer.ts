import { modernTemplate } from './templates/modern';
import { foodTemplate } from './templates/food-beverage';
import { productTemplate } from './templates/product';
import { affiliateTemplate } from './templates/affiliate';
import { personalTemplate } from './templates/personal-branding';
import { officeTemplate } from './templates/office';
import { restaurantTemplate } from './templates/restaurant';

export function renderTemplate(
  template: string,
  data: any
) {
  switch (template) {
    case 'food':
      return foodTemplate(data);

    case 'product':
      return productTemplate(data);

    case 'affiliate':
      return affiliateTemplate(data);

    case 'personal':
      return personalTemplate(data);

    case 'office':
      return officeTemplate(data);

    case 'restaurant':
      return restaurantTemplate(data);

    default:
      return modernTemplate(data);
  }
}
